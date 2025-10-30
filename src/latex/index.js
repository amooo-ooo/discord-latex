// index.js
import { dvi2html } from 'dvi2html';
import { Writable } from 'node:stream';
import { Buffer } from 'node:buffer';
import * as library from './library';
import pako from 'pako';

// Import the WASM module directly. Wrangler will handle bundling it.
import texWasmModule from './tex.wasm'; // Adjust path if needed
import coreDumpBufferGz from './core.dump.gz';

let coredump;
const PAGES = 2500;

// Helper function to copy a Uint8Array
function copy(src) {
    const dst = new Uint8Array(src.length);
    dst.set(src);
    return dst;
}

/**
 * Initializes the renderer by loading the core.dump.gz file.
 * The tex.wasm module is now loaded via a direct import.
 */
async function init() {
    if (coredump) return;
    console.log("Initializing renderer...");
    const inf = new pako.Inflate();
    inf.push(new Uint8Array(coreDumpBufferGz));
    coredump = new Uint8Array(inf.result, 0, PAGES * 65536);
    console.log("Renderer initialized successfully.");
}

export async function render(input) {
    await init();
    console.log("Starting render process...");

    const trimmedInput = input.trim();
    
    let finalInput = trimmedInput;
    if (finalInput.match(/\\begin\s*{document}/) === null) {
        finalInput = '\\begin{document}\n' + finalInput;
    }
    finalInput = finalInput + '\n\\end{document}\n';

    library.deleteEverything();
    library.writeFileSync("sample.tex", Buffer.from(finalInput));

    const memory = new WebAssembly.Memory({ initial: PAGES, maximum: PAGES });
    const buffer = new Uint8Array(memory.buffer, 0, PAGES * 65536);

    buffer.set(copy(coredump));

    library.setMemory(memory.buffer);
    library.setInput(" sample.tex\n\\end\n");

    let dvi;
    try {
        // Use CF-compatible instantiate but match original logic
        const instance = await WebAssembly.instantiate(texWasmModule, {
            library: library,
            env: { memory: memory }
        });

        // Set exports like the original
        const wasmExports = instance.exports;
        library.setWasmExports(wasmExports);

        console.log("WebAssembly instance created. Running main()...");
        wasmExports.main();
        console.log("main() finished.");

        dvi = library.readFileSync("sample.dvi");

        if (!dvi || dvi.length === 0) {
            throw new Error("DVI file is empty or was not created.");
        }

        console.log(`Successfully compiled DVI file. Size: ${dvi.length} bytes.`);
    } catch (error) {
        console.error("Error occurred during WebAssembly TeX execution:", error);
        throw error;
    }
    
    let html = "";
    const page = new Writable({
        write(chunk, _, callback) {
            html += chunk.toString();
            callback();
        }
    });

    // KEY CHANGE: Pass Buffer directly, don't use async generator, don't await
    let machine = dvi2html(Buffer.from(dvi), page);

    console.log("Machine paperwidth:", machine.paperwidth);
    console.log("Machine paperheight:", machine.paperheight);
    console.log("HTML output length:", html.length);
    console.log("HTML output preview:", html.substring(0, 500));

    const svgMatch = html.match(/<svg.*?>.*?<\/svg>/s);
    if (svgMatch) {
        const finalSvg = svgMatch[0].replace(
            /<svg /,
            `<svg width="${machine.paperwidth}pt" height="${machine.paperheight}pt" `
        );
        return finalSvg;
    }

    console.error("SVG not found in DVI conversion output.");
    throw new Error("SVG not found in DVI conversion output.");
}

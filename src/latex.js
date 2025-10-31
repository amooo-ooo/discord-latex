export async function render(formula) {
  const defaultPackages = new Set(['amsmath', 'amstext', 'amsfonts', 'amssymb', 'array']);

  const smartDetection = {
    tikz: /\\begin\{tikzpicture\}|\\draw|\\node|\\path/,
    chemfig: /\\chemfig|\\setchemfig/,
    circuitikz: /\\begin\{circuitikz\}|\\ctikzset/,
    'tikz-cd': /\\begin\{tikzcd\}|\\arrow/,
    pgfplots: /\\begin\{axis\}|\\addplot|\\pgfplotsset/,
    'tikz-3dplot': /\\tdplot|\\tdplotsetmaincoords/,
  };

  const latexColorMap = {
    'black': '626570',
    'white': 'bec0cb',
    'red': 'e74c3c',
    'green': '00b07e',
    'blue': '5865f2',
    'cyan': '69cddf',
    'magenta': 'e91f63',
    'yellow': 'f1c30f',
    'darkgray': '5f7d8c',
    'gray': '99aab5',
    'lightgray': '96a5a7',
    'brown': 'd38e75',
    'lime': '4ed674',
    'olive': 'd2cc5d',
    'orange': 'e67e22',
    'pink': 'f472b6',
    'purple': '9b5ab4',
    'teal': '19bb9c',
    'violet': 'a16eff'
  };

  const colorOverridePackages = new Set(Object.keys(smartDetection));
  const detectedPackages = new Set();

  for (const [pkg, pattern] of Object.entries(smartDetection)) {
    if (pattern.test(formula)) {
      detectedPackages.add(pkg);
    }
  }

  const packageRegex = /\\usepackage(?:\[.*?\])?\{([^}]+)\}/g;
  const extractedPackages = new Set();

  let match;
  while ((match = packageRegex.exec(formula)) !== null) {
    match[1].split(',').forEach(pkg => extractedPackages.add(pkg.trim()));
  }

  const cleanFormula = formula.replace(/\\usepackage(?:\[.*?\])?\{[^}]+\}/g, '').trim();
  const allPackages = new Set([...defaultPackages, ...detectedPackages, ...extractedPackages]);

  const needsColorOverride = [...allPackages].some(pkg => colorOverridePackages.has(pkg));
  const hasChemfig = allPackages.has('chemfig');

  let preamble = Array.from(allPackages).map(pkg => `\\usepackage{${pkg}}`).join('\n');

  preamble += '\n\\usepackage{xcolor}';

  for (const [colorName, hexValue] of Object.entries(latexColorMap)) {
    preamble += `\n\\definecolor{${colorName}}{HTML}{${hexValue}}`;
  }

  if (needsColorOverride) {
    preamble += '\n\\color[HTML]{d9d9dc}';
    if (hasChemfig) {
      preamble += '\n\\definecolor{chemfigcolor}{HTML}{d9d9dc}';
      preamble += '\n\\setchemfig{atom color=chemfigcolor, bond style={color=chemfigcolor}}';
    }
  }

  const formData = {
    formula: cleanFormula,
    preamble: preamble,
    fsize: '22px',
    fcolor: 'bec0cb',
    mode: '0',
    out: '1',
    remhost: 'quicklatex.com',
    rnd: Math.random() * 100
  };

  const body = Object.keys(formData)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
    .join('&');

  try {
    const response = await fetch('https://quicklatex.com/latex3.f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const parts = (await response.text()).split(/\s+/);

    if (parts[0] === '0' && parts[1]) {
      return parts[1];
    } else {
      throw new Error(`QuickLaTeX API Error: ${parts.join(' ')}`);
    }
  } catch (error) {
    console.error('Failed to generate LaTeX image:', error);
    return null;
  }
}

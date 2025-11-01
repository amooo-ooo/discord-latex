# discord-latex

Render LaTeX in Discord. LaTeX+ is a Discord app powered by Cloudflare Workers
and [QuickLaTeX](https://quicklatex.com/). It supports packages including
`tikz`, `pgfplots`, and `chemfig`, with colours themed for Discord. An
experimental renderer using TikZJax on WebAssembly for Cloudflare Workers is
in development.

<!-- ![LaTeX+ in action](https://user-images.githubusercontent.com/534619/157503404-a6c79d1b-f0d0-40c2-93cb-164f9df7c138.gif) -->

## Deployment


[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/amooo-ooo/discord-latex)

### Get Credentials & Clone

- From the
  [Discord Developer Portal](https://discord.com/developers/applications),
  create an application and get your `Application ID`, `Public Key`, and
  `Bot Token`.
- Clone your forked repository and install dependencies.
  ```bash
  git clone https://github.com/YOUR-USERNAME/discord-latex.git
  cd discord-latex
  bun install
  ```

### Configure & Deploy

- Rename `example.dev.vars` to `.dev.vars` and fill it with your credentials.
- Publish the worker and upload your secrets in one step. You will be prompted
  for the secret values.
  ```bash
  bunx wrangler secret put DISCORD_TOKEN
  bunx wrangler secret put DISCORD_PUBLIC_KEY
  bunx wrangler secret put DISCORD_APPLICATION_ID
  bun run publish
  ```

### Finalise

- **Set Endpoint URL:** In your Discord App settings, set the
  `Interactions Endpoint URL` to your new Cloudflare Worker URL.
- **Register Commands:** Run the final command to make slash commands appear.
  ```bash
  bun run register
  ```

For more detailed instructions, review the template repository
[`discord/cloudflare-sample-app`](https://github.com/discord/cloudflare-sample-app).

## Questions?

Feel free to [post an issue here](./issues), or reach out to
[@amooo-ooo](amor.budiyanto@gmail.com).

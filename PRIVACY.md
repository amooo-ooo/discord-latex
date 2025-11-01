# Privacy Policy for LaTeX+

This Privacy Policy describes how data is handled by **LaTeX+**, a Discord bot
developed by **Amor Budiyanto** ("the developer"). By adding or using the LaTeX+
Discord app, you agree to the terms outlined in this policy.

#### Information We Process

LaTeX+ is designed with user privacy as a core principle and **does not log or
store user data**. To function, the bot must temporarily process certain
information in-memory. This ephemeral processing includes:

- **Command Content:** The full content of the message containing a command,
  such as the LaTeX code you wish to render.
- **Discord Identifiers:** Your Discord User ID and the Channel ID where the
  command was used. This is required to deliver the rendered image back to the
  correct user and channel.

This information is processed only for the duration of the command and is
immediately discarded once the response has been sent.

#### How We Use Your Information

The information processed by LaTeX+ is used exclusively to operate the app's
core functionality. This includes:

- **Core Functionality:** Processing your commands to render LaTeX equations
  into images.
- **Ephemeral Operation:** The data is not used for any analytics, tracking,
  improvement, or any other purpose. It is discarded as soon as its function is
  complete.

#### Sharing Your Information

We do not sell your personal information. Your data is only shared with
third-party services when strictly necessary to provide the bot's functionality.

- **Rendering Service (QuickLaTeX):** When you use a render command, only the
  LaTeX code from your message is sent to **QuickLaTeX** to generate the image.
  We do not send your Discord User ID or any other personal information to this
  service. QuickLaTeX's data handling is governed by their own
  [privacy policy](http://www.holoborodko.com/pavel/quicklatex).
- **Hosting Provider (Cloudflare):** The bot operates on Cloudflare Workers. All
  data temporarily passes through Cloudflare's infrastructure for the purpose of
  hosting the service.
- **Legal Compliance:** We may disclose your information only if required by law
  or in response to a valid and binding legal process.

#### Data Retention

**We do not retain any user data, command history, or logs.** All data
processing is ephemeral and occurs strictly in-memory. Because no data is
stored, there is no data to be requested for removal. Data retention for content
sent to QuickLaTeX is subject to their policy.

#### Data Security

We take reasonable technical and administrative measures to protect the bot’s
operational integrity. This includes securing all API tokens and access
credentials. The ephemeral, log-less design is a primary security feature, as it
minimizes the data that could ever be exposed.

#### Changes to this Policy

This Privacy Policy may be updated from time to time. The latest version will
always be available in our GitHub repository. Your continued use of LaTeX+ after
any changes indicates your acceptance of the revised policy.

#### Contact Us

If you have any questions or concerns about this Privacy Policy, please contact
us by:

- Opening an issue on our GitHub repository:
  `https://github.com/amooo-ooo/discord-latex`
- Emailing `amor.budiyanto@gmail.com` with "LaTeX+" in the subject line.

**Effective Date:** `November 2, 2025`

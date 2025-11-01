/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const LX_COMMAND = {
  name: 'lx',
  description: 'Quickly render a simple LaTeX formula.',
  // type: 1, // CHAT_INPUT
  options: [
    {
      name: 'formula',
      description: 'LaTeX formula to render.',
      type: 3, // STRING
      required: true,
    },
  ],
  integration_types: [0, 1], // GUILD and USER installed commands
  contexts: [0, 1, 2] // GUILD, BOT_DM, and PRIVATE_CHANNEL contexts
};

export const LATEX_COMMAND = {
  name: 'latex',
  // type: 1,
  description: 'Opens a prompt for a complex LaTeX expression to render.',
  integration_types: [0, 1],
  contexts: [0, 1, 2]
};
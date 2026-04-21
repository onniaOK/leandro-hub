# Knowledge Base

This folder stores all context the IA Agent uses to answer questions.

## Files

- `profile.js` — Leandro's full professional profile (exported as `PROFILE` constant, consumed by `api/chat.js`)

## How to update

Edit `profile.js` directly. Deploy to Vercel and the agent will pick up the new content on the next request.

For larger knowledge bases, consider adding additional files here (e.g. `projects.js`, `publications.js`) and importing them in `api/chat.js`.

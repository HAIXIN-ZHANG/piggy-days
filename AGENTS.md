# Agent Instructions

## Local Run And Verification

- After frontend changes, start the app and verify it in a browser when practical. Do not rely only on static code reading.
- If the project has an existing run command, prefer project scripts such as `pnpm dev`, `npm run dev`, or `pnpm --filter <app> dev`.
- Ask for confirmation before installing dependencies, downloading packages, changing system settings, or taking actions that may affect the local machine.
- After starting a dev server, report the actual URL, such as `http://localhost:3000`.
- If port `3000` is occupied, use the next available port and report the actual port.
- After verification, stop temporary dev servers by default unless the user explicitly asks to keep them running.
- If a dev server is still running at handoff, explicitly say which port it is using.

## Browser Preference

- Use the Codex in-app browser by default for local page verification, especially for `localhost`, `127.0.0.1`, or the local PWA.
- If the user explicitly asks to verify with Chrome, use Chrome.
- Prefer Chrome when real login state, browser extensions, cookies, a specific profile, or a closer daily browsing environment matters.
- Safari compatibility can be a supplemental check, but do not use Safari as the default automation surface.

## Frontend Verification Standard

After UI or interaction changes, check these when practical:

- Pages open and render correctly.
- Core links, buttons, forms, tabs, and modals work.
- Key state changes behave as expected, such as add, edit, delete, generate recommendation, and mark complete.
- The browser console has no obvious errors.
- Desktop and mobile layouts have no obvious misalignment, overlap, or text overflow.
- If the project supports them, run verification commands such as `typecheck`, `test`, or `build`.

## Ports And Processes

- Do not keep port `3000` occupied long term unless the user explicitly asks to keep the service running.
- If a port needs to be freed, inspect the owning process first, then stop the relevant dev server gracefully when possible.
- Do not blindly kill unknown processes. If the process origin is unclear, explain the situation before acting.
- If the user asks to stop the dev server or free port `3000`, handle it directly.

# Flappy Bird - Calm Edition

[![License: AGPL-3.0-or-later](https://img.shields.io/badge/license-AGPL--3.0--or--later-2f855a)](LICENSE.txt)
[![Vanilla JS](https://img.shields.io/badge/stack-vanilla%20JS-f7df1e)](game.js)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-0f766e)](package.json)
[![Accessible Arcade](https://img.shields.io/badge/accessibility-first-2563eb)](README.md#accessibility)

A browser-first Flappy Bird remix tuned for comfort instead of punishment.

Calm Edition keeps the fast arcade loop, then softens the failure edges: slower pacing, gentler physics, readable visuals, full mobile controls, procedural audio, a forgiving Feather Shield, daily seeded runs, and a small offline-ready PWA shell. There is no build step, no runtime dependency, and no remote asset requirement.

[![Flappy Bird Calm Edition preview showing the hero panel and playfield.](docs/assets/flappy-calm-edition-preview.png)](https://0thernes.github.io/flappy-bird-calm-edition/)

[Play the live demo](https://0thernes.github.io/flappy-bird-calm-edition/) |
[Architecture guide](docs/architecture_master_blueprint.md) |
[Contributing](CONTRIBUTING.md) |
[Support](SUPPORT.md)

## What Makes This Version Different

| Goal | Calm Edition approach |
| --- | --- |
| Less frustration | Larger gaps, slower pipe speed, softer gravity, gentler terminal fall, forgiving hitboxes |
| Better mobile play | Fixed Brake / Flap / Dive controls on coarse-pointer devices |
| Better readability | High-contrast UI, focused status panels, expressive bird states, clear score feedback |
| More player control | Brake, dive, theme selection, physics tuning, music and sound sliders |
| Better reliability | DPR-aware canvas, normalized delta-time physics, guarded storage helpers |
| Better inclusion | Keyboard support, ARIA live updates, reduced-motion handling, focus-managed drawer |

## Feature Highlights

- Calm physics tuned for readable timing.
- Full mobile control bar with Brake, Flap, and Dive.
- Four themes with matching atmosphere and music.
- Daily Seed mode for repeatable runs by date.
- Feather Shield for one graceful recovery.
- Procedural music and sound effects built with Web Audio.
- Persistent local stats and 12 achievements.
- Installable PWA with a tiny offline app shell.
- Zero dependencies and zero build tooling.

## Quick Start

### Open The Game

Open `index.html` directly, or run a tiny local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

### Run The Checks

```bash
npm run check
```

That command verifies:

- JavaScript syntax for `game.js`
- JavaScript syntax for `service-worker.js`
- The repo smoke test in `tests/smoke-test.mjs`

## Controls

| Input | Action |
| --- | --- |
| `Space` / `Arrow Up` / click / tap | Flap |
| hold `Shift` / on-screen Brake | Slow descent |
| hold `Arrow Down` / on-screen Dive | Controlled dive |
| `Escape` | Pause or resume |
| `M` | Mute or unmute |
| `R` | Restart run |
| `F` | Toggle fullscreen |

On phones and tablets, the mobile control bar stays visible near the bottom of the screen so the core actions never depend on hidden gestures.

## Architecture At A Glance

The project is intentionally small and flat:

- `index.html` is the semantic shell, UI layout, mobile controls, drawer, and PWA metadata.
- `style.css` owns layout, theme tokens, accessibility media queries, and component styling.
- `game.js` contains the full runtime engine: physics, rendering, audio, input, persistence, and UI state.
- `manifest.webmanifest` and `service-worker.js` provide installation and offline shell behavior.
- `tests/smoke-test.mjs` protects the repo promises without bringing in a test framework.

For the deeper runtime walkthrough, read [docs/architecture_master_blueprint.md](docs/architecture_master_blueprint.md).

## Repository Map

| Path | Purpose |
| --- | --- |
| `index.html` | Semantic shell, canvas, drawer, tutorial, and install metadata |
| `style.css` | Layout, theme system, responsive rules, and accessibility styling |
| `game.js` | Main engine file with all runtime logic |
| `manifest.webmanifest` | Install metadata for PWA flows |
| `service-worker.js` | Minimal offline shell cache |
| `tests/smoke-test.mjs` | Syntax and surface-area smoke checks |
| `docs/architecture_master_blueprint.md` | Practical architecture reference for maintainers |
| `docs/audit_strict_250_point_inspection.md` | Detailed implementation audit notes |
| `AUDIT-250.md` | Repo closure ledger and checklist-style audit |
| `CLAUDE.md` | AI assistant guidance for this codebase |
| `.github/` | CI workflow, issue templates, and Copilot guidance |
| `.memory/` | Project notes for future maintainers and assistant sessions |

## Accessibility

Accessibility is part of the product, not cleanup work after the fact.

- Fully keyboard-playable core loop.
- ARIA live region for score and status updates.
- Focus-managed customizer drawer with inert background handling.
- Reduced-motion support for effects, weather, particles, and shake.
- Better contrast handling for high-contrast environments.
- Skip link and semantic landmarks for faster navigation.

## Browser Support

- Chrome and Edge 105+
- Firefox 128+
- Safari 16.4+
- Samsung Internet 21+
- Current iOS Safari and Android Chrome

## Documentation Guide

If you are new to the repo, read the docs in this order:

1. `README.md` for the product and workflow overview.
2. `docs/architecture_master_blueprint.md` for the runtime layout.
3. `CONTRIBUTING.md` for change boundaries and review expectations.
4. `CLAUDE.md` for AI-assistant-specific guardrails.

## Contributing

Small, focused changes are preferred. Keep the project dependency-free, browser-first, and calm by default.

See [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Support

If the game does not run as expected, start with [SUPPORT.md](SUPPORT.md).

## License

AGPL-3.0-or-later. See [LICENSE.txt](LICENSE.txt).

If you run a modified version on a public server, offer users the matching source code for that version.

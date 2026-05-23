# Flappy Bird — Calm Edition

[![License: AGPL-3.0-or-later](https://img.shields.io/badge/license-AGPL--3.0--or--later-2f855a)](LICENSE.txt)
[![Vanilla JS](https://img.shields.io/badge/stack-vanilla%20JS-f7df1e)](game.js)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-0f766e)](package.json)
[![Accessible Arcade](https://img.shields.io/badge/accessibility-first-2563eb)](README.md#accessibility)

**A polished, friendly, browser-first Flappy Bird built for flow instead of frustration.**

Calm Edition keeps the instant arcade loop people love, then smooths the rough edges:
gentler physics, readable timing, cozy themes, procedural audio + reverb, accessibility, stats,
12 achievements, a one-hit Feather Shield, a daily-seed mode, and a full on-screen control bar
for phones (Brake / Flap / Dive). Installable as a PWA on iOS and Android. No build step. No
external assets. Just open the game and glide.

[![Flappy Bird Calm Edition preview showing the polished hero and playfield.](docs/assets/flappy-calm-edition-preview.png)](https://0thernes.github.io/flappy-bird-calm-edition/)

[Play the live demo](https://0thernes.github.io/flappy-bird-calm-edition/) ·
[Run locally](#quick-start) ·
[Features](#features) ·
[Contribute](#contributing)

## Why It Feels Better

| Design Goal            | What Calm Edition Does                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Softer difficulty      | Larger pipe gaps, slower travel, gentler gravity, slower terminal fall, circle hitbox.         |
| Full mobile depth      | On-screen Brake / Flap / Dive buttons on phones — full keyboard depth, no controls hidden.     |
| More player expression | Hold Brake (or `Shift`), hold Dive (or `↓`), and tune physics in the Zen Customizer.           |
| More delight           | Themes, reverb, ambient music, particle bursts, expressive bird emotions, cozy achievements.   |
| Less punishment        | Feather Shield absorbs one collision and gives the bird a graceful recovery moment.            |
| Better reliability     | Delta-time physics + DPR-sharp canvas across 60Hz, 144Hz, 240Hz displays and Retina/4K phones. |
| Better inclusion       | Keyboard + skip-link, ARIA live updates, reduced-motion, reduced-transparency, forced-colors.  |
| PWA-ready              | Installable via Add-to-Home-Screen on iOS and Android. Works offline (static files).           |

## Features

- **Mobile control bar** — On-screen Brake / Flap / Dive on coarse-pointer devices.
- **PWA install** — Add to Home Screen on iOS and Android via a real manifest.
- **DPR-sharp canvas** — Crisp on Retina, 2× / 3× phones, and 4K monitors.
- **Calm physics presets** — Tune gravity and speed from gentle to lively.
- **Daily Seed mode** — Deterministic pipe pattern by UTC date for friendly comparison.
- **Zen Customizer** — Physics sliders, audio volumes, theme picker, daily-seed toggle, audio test, reset stats.
- **Four themes** — Sunset, Midnight, Cozy Rain, and Aurora each change colors, weather, and music.
- **Feather Shield** — A collectible bubble that absorbs one crash and grants brief invincibility.
- **Expressive bird** — Calm, happy, scared, determined, and dizzy states with blush, smile, and dizzy swirls.
- **Eye tracking** — Pupils track the nearest safe gap for a lively, readable character.
- **Procedural audio with reverb** — Web Audio creates every tone; convolution reverb gives real ambient space.
- **12 achievements** — From First Flight to Long Haul, each with live progress display.
- **Persistent stats** — Zen minutes, shields saved, runs, near misses, longest survival, current streak.
- **Tutorial overlay** — Shown once on first run; dismissable.
- **Fullscreen toggle** — `F` key or button.
- **Zero dependencies** — Pure HTML, CSS, and JavaScript. No bundler, package install, CDN, or assets.

## Quick Start

### Play In A Browser

Open `index.html` directly, or use a tiny local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

### Check The Project

```bash
npm run check
```

The check runs JavaScript syntax validation plus a smoke test for the core repo promises:
canvas, accessibility hooks, customizer, storage helpers, and security-sensitive ignore rules.

## Controls

| Input                              | Action            |
| ---------------------------------- | ----------------- |
| `Space` / `Arrow Up` / Click / Tap | Feather flap      |
| On-screen **Brake** / Hold `Shift` | Soften descent    |
| On-screen **Dive**  / Hold `↓`     | Controlled dive   |
| `Escape`                           | Pause or resume   |
| `M`                                | Mute or unmute    |
| `R`                                | Fresh restart     |
| `F`                                | Fullscreen        |

On a phone, the on-screen control bar stays fixed near the bottom of the viewport with full Brake / Flap / Dive buttons.

## Accessibility

Calm Edition treats accessibility as part of the game design, not a side quest.

- Fully keyboard-playable controls.
- Screen-reader status updates through an ARIA live region.
- `prefers-reduced-motion` support for motion, particles, trails, shake, and weather density.
- High-contrast media query support.
- Modal-style customizer drawer with focus management and inert background behavior.

## Engineering Notes

| Area         | Approach                                                                                |
| ------------ | --------------------------------------------------------------------------------------- |
| Rendering    | Canvas 2D + DPR scaling. Offscreen sprite caches for sky / clouds / bird-per-emotion.   |
| Audio        | Web Audio with master gain, convolution reverb, lowpass. Scheduled on AudioContext clock. |
| Physics      | Normalized delta time (`dt`), capped lag spikes, semi-implicit Euler. True circle hitbox. |
| Performance  | Pre-allocated particle / weather pools. Nearest-pipe cache. Frame-error rate limiting.    |
| Persistence  | Guarded `localStorage` helpers, throttled save on `visibilitychange` and `beforeunload`.  |
| PWA          | `manifest.webmanifest`, `apple-touch-icon`, `theme-color`. Installable on iOS / Android.  |
| Distribution | Static files only. The game works from disk, localhost, GitHub Pages, or any static host. |

## Browser Support

- Chrome / Edge 105+
- Firefox 128+
- Safari 16.4+
- Samsung Internet 21+
- iOS / Android Chrome and Safari (current)

## Repository Map

| Path                      | Purpose                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `index.html`              | Semantic shell, canvas, mobile control bar, customizer drawer, tutorial, PWA meta tags.    |
| `style.css`               | Responsive dark UI, layered cascade, themes, accessibility media queries, mobile controls. |
| `game.js`                 | Game engine: physics, rendering, audio (with reverb), input, persistence, achievements.    |
| `manifest.webmanifest`    | PWA install metadata.                                                                      |
| `tests/smoke-test.mjs`    | Lightweight repo smoke checks (validates the public surface).                              |
| `AUDIT-250.md`            | 250-point solo web-game quality audit and closure ledger.                                  |
| `CHANGELOG.md`            | Version history.                                                                           |
| `CLAUDE.md`               | Project context for AI coding assistants.                                                  |
| `docs/assets/`            | README and repository presentation assets.                                                 |
| `.github/ISSUE_TEMPLATE/` | Friendly issue forms for bugs, ideas, and accessibility feedback.                          |
| `.memory/`                | Project context notes for future maintainers and AI assistants.                            |
| `LICENSE.txt`             | AGPL-3.0-or-later license text.                                                            |

## Contributing

Contributions are welcome when they keep the game calm, accessible, dependency-free, and easy
to run. Start with [CONTRIBUTING.md](CONTRIBUTING.md), then use the issue templates for bugs,
feature ideas, or accessibility feedback.

Good first areas:

- Theme polish and seasonal palettes.
- Accessibility testing across browsers and assistive tech.
- Documentation improvements.
- Tiny quality-of-life improvements that preserve the no-build-step setup.

## Support

Need help running the game or reporting a problem? See [SUPPORT.md](SUPPORT.md).

## License

AGPL-3.0-or-later. See [LICENSE.txt](LICENSE.txt).

If you run a modified version on a public server, offer users the matching source code.

---

Built for players who want the joy of Flappy Bird with a little more grace in the wings.

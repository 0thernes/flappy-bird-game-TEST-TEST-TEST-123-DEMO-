# Decisions

Architectural commitments made in this project.

- Single-file game logic. All game code lives in `game.js`. No bundler, no modules.
- No dependencies. No npm, no build step. `index.html` works opened directly from disk.
- Procedural audio. Every sound is synthesized via Web Audio. No asset files.
- Refresh-rate-independent physics. `dt = 1.0` means one 60fps frame elapsed. Scale every per-frame quantity by `dt`.
- Use `Math.pow(base, dt)` for exponential decay so it composes correctly across any frame rate.
- Use semi-implicit (symplectic) Euler integration: update velocity first, then position from the new velocity.
- Canvas is a fixed 420×640 internal resolution. CSS scales the display. Physics never reads CSS pixels.
- Collision uses an axis-aligned bird hitbox with a 6px inset. Squash and stretch are visual only — they never change the hitbox.
- Pause on `blur` and `visibilitychange`. Never run physics while the tab is hidden.
- Music is scheduled on the AudioContext sample clock via a lookahead scheduler — never on `setInterval` callbacks.
- Audio channels are independent. `playToneAt` takes raw volume. `playTone` applies `sfxVolume`. The music scheduler applies `musicVolume`. Never apply both scalings to the same tone.
- Four visual themes (sunset / midnight / rain / aurora). Each defines its own palette for bird, ground, sky, and pipes, plus its own music arpeggio and weather behavior.
- Customizer settings (theme, gravity preset, speed preset, music volume, SFX volume) persist via `localStorage` and are read at startup.
- Particles and weather use pre-allocated object pools (220 and 120 slots). `spawnParticles` / `spawnWeatherParticle` reuse from the pool — zero per-frame allocation.
- Stats and achievements persist via `localStorage`. Saves are explicit, not auto — call `syncStatsAndAchievements(true)` to write.
- Accessibility is a first-class layer. Respect `prefers-reduced-motion` in physics, rendering, effect density, and weather. Announce score and state changes via ARIA live region.

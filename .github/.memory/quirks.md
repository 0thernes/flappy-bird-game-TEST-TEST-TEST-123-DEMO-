# Quirks

Project-specific weirdness — the non-obvious stuff.

- AudioContext starts in `suspended` state. It only resumes after a user gesture. `ensureAudio()` handles this on the first click or keypress.
- `gain.gain.exponentialRampToValueAtTime` cannot ramp to `0` — exponentials never reach zero. Use `0.0001` as the silent floor.
- The browser does not re-fire `keydown` for an already-held key. To carry held modifiers across a restart, we keep a `heldKeys` Set and re-apply state in `resetGame()`.
- `dt` is clamped to a max of `3`. This is the load-bearing collision-safety invariant: at `dt = 3` per-frame motion stays ≤7px against ≥60px barriers, so tunneling is impossible across all gravity / speed presets.
- `state.time` accumulates `dt` (normalized-frame units). Use it — not `Date.now()` or `performance.now()` — for any in-game timing so behavior stays frame-rate independent.
- Sound effect throttles for held actions (dive, brake) compare against `state.time`, not raw frame counts, so they fire at correct real-time intervals on any monitor.
- `terminalRise` (-2.75) is only reached at gravity preset 4, where `flap` is exactly -2.75. At lower presets the flap impulse is weaker than the clamp, so it acts as a defensive guard.
- `globalAlpha` is canvas-global state. Always reset it to `1` after per-element alpha drawing, or everything painted afterward becomes translucent.
- Music notes go through `playToneAt` directly. SFX goes through `playTone`. Mixing the two would compound `musicVolume` and `sfxVolume` — don't.
- Opening the customizer drawer auto-pauses the running game. Closing it does NOT auto-resume — the player resumes explicitly via Esc or the Pause button.
- Theme switching mid-run clears active weather particles and restarts the music scheduler so the new theme's arpeggio takes effect immediately.
- `localStorage` keys: `flappy-best`, `flappy-theme`, `flappy-gravity`, `flappy-speed`, `flappy-music-volume`, `flappy-sfx-volume`, `zen-time-sec`, `shields-saved-count`, `runs-count`, `near-misses-count`, `played-themes` (JSON array).
- The pre-allocated `bird.trail` is always 10 slots. Under reduced motion the update loop is skipped entirely (drawBirdTrail short-circuits there), and any residue lives are zeroed so a mid-run toggle doesn't leave a stale trail.

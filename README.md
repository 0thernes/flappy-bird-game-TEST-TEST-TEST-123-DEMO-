# Flappy Bird - Calm Edition

A dependency-free browser game built with HTML, CSS, and JavaScript. It keeps the familiar Flappy Bird loop, then softens the experience with forgiving physics, customizable pacing, procedural audio, visual themes, a feather shield, persistent stats, and accessibility-minded controls.

## Run

Open `index.html` directly in a modern browser, or run a local server:

```powershell
npm run serve
```

Then open `http://127.0.0.1:8000`.

## Check

Run the static smoke checks:

```powershell
npm run check
```

The check verifies JavaScript syntax, required app elements, documented feature coverage, and that `.gitignore` does not contain obvious credential markers.

## Controls

| Input | Action |
| --- | --- |
| `Space` / `Arrow Up` / click / tap | Flap |
| `Shift` | Feather the descent |
| `Arrow Down` | Controlled dive |
| `Escape` | Pause or close the customizer |
| `M` | Mute or unmute |
| `R` | Restart |

## Systems

- `index.html` defines the page shell, live status region, canvas, toolbar, and customizer drawer.
- `style.css` provides the responsive layout, theme variables, customizer styling, reduced-motion handling, and high-contrast affordances.
- `game.js` owns the game loop, delta-time physics, rendering, procedural audio, input, stats, achievements, shield behavior, and persistence.

## Gameplay

Pass through pipe gaps to score. The ceiling gently clamps the bird instead of ending the run. Hitting the ground or a pipe ends the run unless a Feather Shield is active. Shields absorb one collision, pop the bird upward, and grant a short invincibility window.

## Customizer

The Zen Customizer lets you choose one of four visual themes, adjust gravity and scroll speed, and tune music/SFX volume. Preferences are saved in `localStorage` so they survive refreshes.

## Security Note

This repository previously had private credential material in `.gitignore`. The file has been replaced with normal ignore rules. Any previously exposed private material should still be treated as compromised and rotated, especially if the old file was committed or pushed.

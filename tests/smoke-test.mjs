import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";

const textFiles = {
  html: await readFile("index.html", "utf8"),
  css: await readFile("style.css", "utf8"),
  js: await readFile("game.js", "utf8"),
  readme: await readFile("README.md", "utf8"),
  gitignore: await readFile(".gitignore", "utf8"),
  gitattributes: await readFile(".gitattributes", "utf8"),
  manifest: await readFile("manifest.webmanifest", "utf8"),
  changelog: await readFile("CHANGELOG.md", "utf8"),
  claudeMd: await readFile("CLAUDE.md", "utf8"),
};

// Syntax check
const syntax = spawnSync(process.execPath, ["--check", "game.js"], { encoding: "utf8" });
assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout);

// Core canvas + ARIA
assert.match(textFiles.html, /<canvas[\s\S]*id="game"/,             "canvas missing");
assert.match(textFiles.html, /id="srStatus"/,                       "live status missing");
assert.match(textFiles.html, /id="customizerDrawer"/,               "customizer drawer missing");
assert.match(textFiles.html, /aria-modal="true"/,                   "drawer aria-modal missing");
assert.match(textFiles.html, /\binert\b/,                           "drawer inert missing");
assert.match(textFiles.html, /class="skip-link"/,                   "skip-link missing");

// Mobile controls
assert.match(textFiles.html, /id="mobileControls"/,                 "mobile control bar missing");
assert.match(textFiles.html, /id="mBrake"/,                         "mobile brake button missing");
assert.match(textFiles.html, /id="mFlap"/,                          "mobile flap button missing");
assert.match(textFiles.html, /id="mDive"/,                          "mobile dive button missing");
assert.match(textFiles.css,  /\.mobile-controls/,                   "mobile control styles missing");
assert.match(textFiles.css,  /position:\s*fixed/,                    "mobile controls must stay reachable on phones");
assert.match(textFiles.css,  /\.stage\s*\{\s*order:\s*-1;/,          "mobile layout must prioritize the playable stage");
assert.match(textFiles.js,   /function bindMobileControls\(/,       "bindMobileControls missing");

// PWA
assert.match(textFiles.html, /rel="manifest"/,                      "manifest link missing");
assert.match(textFiles.html, /name="theme-color"/,                  "theme-color meta missing");
assert.match(textFiles.html, /apple-mobile-web-app-capable/,        "apple PWA meta missing");
assert.match(textFiles.html, /property="og:image"/,                 "og:image missing");
assert.match(textFiles.html, /name="twitter:card"/,                 "twitter:card missing");
assert.ok(textFiles.manifest.trim().length > 0,                     "manifest empty");
const manifest = JSON.parse(textFiles.manifest);
assert.ok(manifest.name && manifest.icons?.length > 0,              "manifest must declare name + icons");

// Tutorial + fullscreen + daily seed + reset stats + audio test
assert.match(textFiles.html, /id="tutorialOverlay"/,                "tutorial overlay missing");
assert.match(textFiles.html, /id="fullscreenToggle"/,               "fullscreen toggle missing");
assert.match(textFiles.html, /id="dailySeedToggle"/,                "daily seed toggle missing");
assert.match(textFiles.html, /id="resetStatsBtn"/,                  "reset stats button missing");
assert.match(textFiles.html, /id="audioTestBtn"/,                   "audio test button missing");

// Game.js public surface (preserved + new)
assert.match(textFiles.js, /function loop\(/,                       "loop() missing");
assert.match(textFiles.js, /function updateDerivedPhysics\(/,       "updateDerivedPhysics missing");
assert.match(textFiles.js, /function bindDrawerControls\(/,         "bindDrawerControls missing");
assert.match(textFiles.js, /function setCustomizerOpen\(/,          "setCustomizerOpen missing");
assert.match(textFiles.js, /function configureCanvasForDPR\(/,      "DPR configurator missing");
assert.match(textFiles.js, /function mulberry32\(/,                 "seeded RNG missing");
assert.match(textFiles.js, /function buildReverbBuffer\(/,          "reverb builder missing");
assert.match(textFiles.js, /function trapDrawerFocus\(/,            "drawer focus trap missing");
assert.match(textFiles.js, /function focusElement\(/,               "drawer focus helper missing");
assert.match(textFiles.js, /function getDrawerFocusable\(/,         "drawer focus target helper missing");
assert.match(textFiles.js, /drawer\.contains\(document\.activeElement\)/,
  "drawer focus trap must recover focus from outside the drawer");
assert.match(textFiles.js, /function toggleFullscreen\(/,           "fullscreen toggle missing");
assert.match(textFiles.js, /function circleHitsRect\(/,             "circle hitbox missing");

// Canvas sizing must not upscale the 420px logical game into an oversized desktop billboard.
assert.match(textFiles.css, /\.canvas-wrap\s*\{[\s\S]*width:\s*min\(100%,\s*420px\)/,
  "canvas wrapper must cap the CSS game width");

// Persistence helpers (guarded)
assert.match(textFiles.js, /best:\s*readStoredNumber\(['"]flappy-best['"]/,
  "best score must read through guarded helper");
assert.match(textFiles.js, /zenTimeSec:\s*readStoredNumber\(['"]zen-time-sec['"]/,
  "stats must read through guarded helper");

// .gitattributes / line endings
assert.match(textFiles.gitattributes, /eol=lf/, ".gitattributes eol must be lf");

// Secrets must not be hinted at in .gitignore
const forbiddenSecretMarkers = [
  new RegExp(["Recovery", "Codes"].join(" "), "i"),
  new RegExp(["Backup", "Codes"].join(" "), "i"),
  new RegExp(["Bit", "Locker"].join(""), "i"),
  new RegExp(["Client", "Secret"].join(" "), "i"),
  new RegExp(["Signing", "Secret"].join(" "), "i"),
  new RegExp(["OAuth", "Token"].join(" "), "i"),
  new RegExp(["API", "Key"].join(" "), "i"),
  new RegExp(["xo", "x", "[", "b", "a", "p", "r", "s", "]-"].join(""), "i"),
  new RegExp(["xa", "pp-"].join(""), "i"),
];
for (const marker of forbiddenSecretMarkers) {
  assert.doesNotMatch(textFiles.gitignore, marker, `.gitignore contains sensitive marker ${marker}`);
}

// README + CHANGELOG + CLAUDE.md sanity
assert.match(textFiles.readme,    /Customizer/i,      "README should mention the customizer");
assert.match(textFiles.readme,    /Feather Shield/i,  "README should mention the shield");
assert.match(textFiles.changelog, /2\.0\.0/,          "CHANGELOG should include v2.0.0");
assert.match(textFiles.claudeMd,  /Hard rules/,       "CLAUDE.md should declare hard rules");

// Expanded achievements present in HTML
for (const id of [
  "achFirstFlight","achZenMaster","achShieldSavior","achThemeExplorer",
  "achCalmMarathon","achFeatherweight","achFeatherlight","achStreakKeeper",
  "achBrakeMaster","achDiver","achIronCalm","achLongHaul"
]) {
  assert.match(textFiles.html, new RegExp(`id="${id}"`), `achievement ${id} missing`);
}

console.log("Smoke checks passed.");

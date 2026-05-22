# Security

Rules that must NEVER be broken. Always read this file.

- Never paste credentials, provider keys, restore material, or backup material into project files.
- `.gitignore` files are tracked by git, not ignored. Do not store secrets there.
- Use a password manager for all credentials. Keep restore material off-disk.
- Rotate any secret that has touched plaintext on disk. Assume it is compromised.
- No auth material in commits, comments, READMEs, or memory files.
- Before publishing or pushing a repo, scan every file — not just source — for secrets.

# Security Policy

## Supported Version

The `main` branch is the supported version.

## Reporting A Vulnerability

Please report security concerns privately through GitHub's security advisory flow when
available. If that is not available, open a minimal issue that says a private security
report is needed without posting sensitive details.

## Scope

This is a static browser game. Security concerns usually fall into these areas:

- Unsafe links or injected markup.
- Sensitive material accidentally committed to the repo.
- Browser storage behavior that could expose private data.
- Supply-chain risk from proposed dependencies.

## Project Rules

- Do not commit credentials or private recovery material.
- Do not add runtime dependencies without a strong reason.
- Do not store sensitive user data in `localStorage`.
- Keep the game safe to run as static files.

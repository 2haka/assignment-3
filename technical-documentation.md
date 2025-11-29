# Technical Documentation

## Overview
Single-page portfolio demonstrating required advanced client-side features for Assignment 3:
- API integration with GitHub.
- Stateful UI controls (filters, sorting, saved name, theme toggle with persistence).
- Complex logic via validation, filtering, sorting, and timers.

## Architecture
- `index.html`: Semantic layout with sections for hero, projects, API feed, contact, and docs.
- `css/styles.css`: Dual theme palettes (light/dark) powered by CSS variables, responsive grid, sticky topbar.
- `js/script.js`: Houses all client-side logic; no build tools required.

## State Management
- `state.name`: stored in `localStorage` and used for greeting.
- `state.filter`, `state.sort`: drive project grid render.
- `state.timerSeconds`: increments every second for the session timer.
- `state.theme`: persisted to `localStorage`; applied to `data-theme` attribute on `<body>` to swap variable palettes.

## Complex Logic
- Filtering and sorting: buttons set category filter; select sets sort (newest, oldest, A to Z). Render derives from state.
- Contact validation: checks for required fields, email pattern, and minimum message length (10 chars). Errors coalesced into a helper message; success message displayed without sending data.
- Session timer: interval increments display every second.
- Name persistence: saves visitor name and restores on load.
- Theme toggle: flips between light/dark palettes and saves preference in `localStorage`.

## API Integration
- Endpoint: `https://api.github.com/users/:username/repos?sort=updated&per_page=6`
- Flow: on load and on "Refresh", fetches repos, handles non-200 responses, empty arrays, and network errors with user-friendly messages.
- Output: rendered cards show repo name, description fallback, updated date, and link.

## Performance and Compatibility Notes
- Minimal assets; fonts are the only external requests. No images or third-party JS bundles.
- Single CSS and JS files, loaded once, to reduce network overhead.
- Scoped DOM updates: grids are cleared and repopulated as needed to avoid excessive DOM churn.
- Theme swaps via `data-theme` and CSS variables; avoids layout thrash during toggles.
- Targeted at modern browsers supporting `fetch`, `localStorage`, and CSS variables (evergreen Chrome/Edge/Firefox/Safari).
- The prior performance panel was removed to keep the UI lean; performance practices remain as listed above.

## How to Run
Open `index.html` in any modern browser. No server or build step required.

## Manual Testing Checklist
- Save a name; reload to confirm greeting persists.
- Filter projects by category; change sort order; verify counts update.
- Enter valid/invalid contact form data to see validation messaging.
- Load GitHub repos with a valid user and with an invalid user to confirm error handling.

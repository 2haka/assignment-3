# Assignment 3 - Advanced Functionality Portfolio

Single-page portfolio that demonstrates API integration, complex UI logic, state management (including theme persistence), and built-in performance-focused choices.

## Features
- GitHub API integration to display recent repositories with error handling.
- Filterable/sortable project list driven by client-side state.
- Visitor name memory, theme toggle with persistence, and session timer.
- Contact form with validation for empties, email format, and minimum message length.
- Prior iteration included a performance snapshot panel; current build keeps the layout lean and focused on UX and state features.

## Getting Started
1) Clone the repository  
`git clone https://github.com/<your-username>/assignment-3.git`
2) Open `index.html` in your browser (no build step or dependencies required).
3) Optional: edit the GitHub username in the "Live GitHub Feed" section or type a different username in the UI and click Refresh.

## Project Structure
- `index.html` - main page.
- `css/styles.css` - layout and theming.
- `js/script.js` - state, API calls, logic.
- `docs/technical-documentation.md` - architecture and logic details.
- `docs/ai-usage-report.md` - how AI assisted this work.


## Performance and Compatibility Notes
- Single CSS and JS file; fonts are the only external asset. No large images or third-party JS bundles.
- Avoids blocking scripts and keeps DOM updates scoped to the needed containers.
- Theme flips via a single `data-theme` attribute and CSS variables to minimize repaints.
- Relies on modern browsers with `fetch`, `localStorage`, and `CSS` variable support (evergreen Chrome/Edge/Firefox/Safari).


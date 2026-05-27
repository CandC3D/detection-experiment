# Student Essay Authenticity Calibration

A calibration exercise for a system designed to help educators identify AI-generated student essays. Volunteers read nine short essays and record their judgment of each one's origin.

The exercise takes approximately 20 minutes. No personal information is collected; responses are recorded anonymously and may be used in published research on automated detection methods.

## Running the site

Static site, no build step. Open `index.html` locally, or deploy to GitHub Pages by pushing to a repository with Pages enabled on the `main` branch (root).

## Backend

Responses are written to a Google Sheet via a Google Apps Script Web App. See `apps_script/Code.gs` for the endpoint and deployment notes. After deploying, paste the `/exec` URL into `assets/experiment.js` as `BACKEND_URL`.

## Files

- `index.html` — landing page
- `experiment.html` — rating interface
- `debrief.html` — post-completion page
- `essays.json` — essay corpus (50 essays, 10 topics × 5 sources)
- `assets/style.css`, `assets/experiment.js` — styles and logic
- `apps_script/Code.gs` — Google Apps Script backend

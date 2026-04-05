# ApproxOS-Scheduling

# Phase I — Approximate Computing in OS Kernel Internals
### Research Paper UI

A clean, dark-themed browser UI for presenting the Phase I research paper structure.

---

## Folder Structure

```
phase1-research-ui/
│
├── index.html                  ← Entry point. Open this in a browser.
│
└── src/
    ├── main.js                 ← App shell, router, navigation logic
    │
    ├── data/
    │   └── content.js          ← ALL research content (edit here to update UI)
    │
    ├── components/
    │   ├── sections.js         ← HTML renderers for each section
    │   └── icons.js            ← SVG icon strings
    │
    └── styles/
        └── main.css            ← All styling (dark theme, layout, components)
```

---

## How to Run

**Option 1 — Direct browser (simplest):**
Since the project uses native ES modules, you need a local server (not double-click open).

```bash
# Using Python (built-in):
cd phase1-research-ui
python3 -m http.server 8080
# Then open: http://localhost:8080
```

```bash
# Using Node (if you have npx):
npx serve .
# Then open the URL it prints
```

```bash
# Using VS Code:
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

**Option 2 — Vite (recommended for development):**
```bash
cd phase1-research-ui
npm init -y
npm install --save-dev vite
npx vite
```

---

## How to Edit Content

**All research content is in one file:**
```
src/data/content.js
```

You can update:
- Abstract paragraphs
- Introduction motivation cards
- Literature review papers (add/remove/edit)
- Research gaps
- Problem statement text
- Aim and objectives

No need to touch HTML or CSS for content changes.

---

## Features

- Sidebar navigation with section numbers
- Progress bar in topbar
- Keyboard navigation (Arrow keys ← →)
- URL hash routing (#abstract, #intro, etc.)
- Fully responsive (mobile-friendly)
- Smooth section transitions
- All content editable from one data file

---

## Sections

| # | Section | What It Contains |
|---|---------|-----------------|
| 00 | Abstract | 210-word summary |
| 01 | Introduction | Motivation + Contributions |
| 02 | Literature Review | 8 papers with limitations |
| 03 | Research Gaps | 5 identified gaps |
| 04 | Problem Statement | Precise problem + 3 pillars |
| 05 | Aim & Objectives | Aim, scope, 5 objectives |

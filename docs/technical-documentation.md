# Technical Documentation — Assignment 3

**Student:** Abdullah Alzahrani | **ID:** 202265440  
**Repository:** `202265440-AbdullahAlzahrani-assignment3`  

---

## Project Overview

A personal portfolio web application built with vanilla HTML, CSS, and JavaScript. Assignment 3 extends Assignment 2 by adding project sorting, visit-duration tracking, and visitor name persistence.

---

## Folder Structure

```
202265440-AbdullahAlzahrani-assignment3/
├── index.html                  # Main HTML document
├── css/
│   └── styles.css              # All styles (CSS variables, layout, components)
├── js/
│   └── script.js               # All JavaScript (features 1–11)
├── assets/
│   ├── profile.png             # Profile photo
│   └── Abdullah-Alzahrani-CV.pdf
├── docs/
│   ├── ai-usage-report.md      # This file's companion
│   └── technical-documentation.md
├── README.md
└── .gitignore
```

---

## Features

### Carried Over from Assignment 2

| # | Feature | Implementation |
|---|---------|----------------|
| 1 | **Theme toggle** | `localStorage` key `portfolio-theme`; applies `data-theme="dark"` on `<html>` |
| 2 | **Project filter** | Filters `.project-card` by `data-tags` attribute |
| 3 | **Project search** | Live `input` event listener; checks card text content |
| 4 | **GitHub API** | `fetch` to GitHub REST API; graceful fallback on error |
| 5 | **Contact form validation** | Client-side checks for name, email format, and message length |
| 6 | **Scroll reveal** | `IntersectionObserver` adds `.visible` class at 12% threshold |
| 7 | **Magnetic buttons** | `mousemove` translates buttons toward cursor on pointer devices |
| 8 | **3D tilt** | `rotateX/Y` perspective transform on project and repo cards |
| 9 | **Canvas background** | Particle system with mouse-repulsion and parallax scroll |

### New in Assignment 3

| # | Feature | Implementation |
|---|---------|----------------|
| 10 | **Project sort** | `<select>` triggers `filterAndSort()`; re-appends visible DOM nodes in sorted order |
| 11 | **Visit timer** | `setInterval` every 1s; formats elapsed ms as `Xs` or `Xm Ys` |
| 12 | **Visitor name** | Input + save button; persists to `localStorage` key `portfolio-visitor-name`; displays greeting in navbar |

---

## API Integration

**GitHub REST API**  
- Endpoint: `https://api.github.com/users/Abdullah-Zh/repos?sort=updated&per_page=6`  
- Forks are filtered out client-side.  
- On network failure, a static fallback array is rendered so the section is never empty.  
- A retry button allows re-fetching without a page reload.

---

## State Management

| State | Storage | Scope |
|-------|---------|-------|
| Light/dark theme | `localStorage` | Persists across sessions |
| Visitor name | `localStorage` | Persists across sessions |
| Active filter | JS variable (`activeFilter`) | Session only |
| Sort order | `<select>` DOM value | Session only |
| Visit timer | `Date.now()` delta | Session only |

---

## Performance Notes

- All images use `loading="lazy"` except the hero profile photo (`loading="eager"`).
- The particle canvas only initializes on `(pointer: fine)` devices, skipping mobile.
- `IntersectionObserver` unobserves elements after they become visible, avoiding redundant callbacks.
- CSS uses `transform` and `opacity` for animations (GPU-accelerated; avoids layout reflow).
- Scroll listeners use `{ passive: true }` to avoid blocking the main thread.

---

## Browser Compatibility

Tested on: Chrome 124+, Firefox 125+, Safari 17+  
Mobile: Responsive layout; canvas and tilt effects disabled on touch devices.

---

## How to Run Locally

```bash
git clone https://github.com/Abdullah-Zh/202265440-AbdullahAlzahrani-assignment3.git
cd 202265440-AbdullahAlzahrani-assignment3
# Open index.html in any modern browser
open index.html
```

No build tools or dependencies required. Pure HTML/CSS/JS.

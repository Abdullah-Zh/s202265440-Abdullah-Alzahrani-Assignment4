# 202265440-AbdullahAlzahrani-Assignment4

**Abdullah Alzahrani** | Student ID: 202265440  
Software Engineering — King Fahd University of Petroleum & Minerals (KFUPM)  
Course: SWE Foundation | Assignment 4 — Personal Web Application (Final)

---

## Project Description

This is the final and complete version of my personal portfolio web application, building on Assignments 1, 2, and 3. The goal of this assignment was to deliver a polished, production-ready web application that demonstrates mastery of all course concepts — advanced JavaScript, API integration, state management, performance optimization, and creative innovation.

The portfolio showcases my background, skills, featured projects, live GitHub repositories, a personal journey timeline, and a validated contact form.

**Live Site:** *(Deploy link — e.g. https://abdullah-zh.github.io/202265440-AbdullahAlzahrani-Assignment4)*

---

## Features Added in Assignment 4 (Innovation)

| Feature | Description |
|---|---|
| **Typewriter Effect** | The hero section cycles through roles — `Developer`, `Designer`, `Problem Solver`, `Team Leader` — with a blinking cursor animation |
| **Color Theme Switcher** | 4 accent color themes (Red, Blue, Green, Purple) selectable from the navbar; choice is saved to localStorage |
| **Animated Skill Bars** | Skills displayed as animated progress bars that fill when scrolled into view |
| **Interactive Timeline** | Vertical timeline of education and leadership roles with hover animations and staggered scroll reveal |

---

## All Features (Assignments 1–4)

| Feature | Description |
|---|---|
| **Typewriter Effect** | Hero role cycles dynamically with typing and deleting animation |
| **Color Theme Switcher** | 4 accent colors persisted across sessions via localStorage |
| **Animated Skill Bars** | Scroll-triggered animated progress bars for each skill |
| **Interactive Timeline** | Vertical journey timeline with staggered reveal and hover effects |
| **Project Filter** | Filter projects by tag (Figma, Java, Design Patterns, UML) |
| **Project Search** | Live search filtering across all project cards |
| **Project Sort** | Sort visible projects by name A→Z or Z→A |
| **GitHub API** | Fetches live repositories with loading, error, fallback, and retry states |
| **Form Validation** | Full client-side validation with inline error messages |
| **Scroll Reveal** | Sections animate in on scroll using IntersectionObserver |
| **Theme Toggle** | Light/dark mode persisted to localStorage |
| **Visit Timer** | Live counter showing how long the visitor has been on the page |
| **Visitor Name** | Saves visitor's name to localStorage and displays a personalized greeting in the navbar |
| **Particle Canvas** | Interactive animated background that reacts to mouse movement |
| **3D Tilt Effect** | Project cards and profile image tilt based on cursor position |
| **Magnetic Buttons** | Buttons shift slightly toward the cursor for a polished feel |
| **Scroll Progress Bar** | Thin bar at the top showing reading progress |
| **Responsive Design** | Works on mobile, tablet, and desktop |

---

## Folder Structure

```
202265440-AbdullahAlzahrani-Assignment4/
├── index.html                  # Main HTML file
├── README.md                   # This file
├── .gitignore
├── css/
│   └── styles.css              # All styles with CSS variables and theming
├── js/
│   └── script.js               # All JavaScript functionality
├── assets/
│   ├── profile.png             # Profile photo
│   └── Abdullah-Alzahrani-CV.pdf
├── docs/
│   ├── ai-usage-report.md      # AI tools documentation
│   └── technical-documentation.md
└── presentation/
    ├── slides.pdf              # Presentation slides
    └── demo-video.mp4          # 5–7 minute video walkthrough
```

---

## Setup Instructions

### Run Locally

This is a **static website** — no build tools, no dependencies, no installation required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdullah-Zh/202265440-AbdullahAlzahrani-Assignment4.git
   ```

2. **Navigate into the folder:**
   ```bash
   cd 202265440-AbdullahAlzahrani-Assignment4
   ```

3. **Open in browser:**
   - **Option A (Recommended):** Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code. Right-click `index.html` → "Open with Live Server".
   - **Option B:** Double-click `index.html` to open directly in your browser.
   - **Option C:** Use Python's built-in server:
     ```bash
     python3 -m http.server 8080
     # Then visit http://localhost:8080
     ```

### Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch → main → / (root)**.
4. GitHub Pages will publish the site automatically within a few minutes.

---

## API Integration

**GitHub REST API**

**Endpoint:**
```
https://api.github.com/users/Abdullah-Zh/repos?sort=updated&per_page=6
```

**How it works:**
- On page load, the site fetches the 6 most recently updated public repositories
- Each repository is displayed as a card with name, description, language, and star count
- Forked repositories are filtered out automatically
- On failure, static fallback cards are shown so the section is never empty
- A retry button allows re-fetching without a page reload

---

## How to Use

1. Use the navigation bar to jump between sections: About, Journey, Projects, GitHub, CV, and Contact.
2. Watch the hero section for the dynamic typewriter effect cycling through roles.
3. Click one of the 4 color dots in the navbar to switch accent themes (Red, Blue, Green, Purple); your choice is saved.
4. Click the theme toggle to switch between light and dark mode; preference is saved.
5. Scroll to the About section to see skill bars animate and fill to their percentages.
6. Scroll through the Journey timeline to see your education and leadership history reveal with staggered animations.
7. In the Projects section, use filter buttons, the search bar, and the sort dropdown together to find specific projects.
8. Open the GitHub section to view live repository cards fetched from the API.
9. Fill out the contact form — validation runs immediately on submission.
10. Enter your name in the visitor widget to see a personalized greeting in the navbar saved across visits.
11. Watch the visit timer in the visitor widget update every second.
12. On desktop, hover over cards and buttons to see tilt and magnetic effects.

---

## Technologies Used

- **HTML5** — Semantic structure, ARIA accessibility attributes
- **CSS3** — Custom properties, Flexbox, Grid, keyframe animations, media queries
- **Vanilla JavaScript (ES6+)** — No frameworks or libraries
- **GitHub REST API** — Live repository data
- **Google Fonts** — DM Serif Display, DM Mono, DM Sans
- **Web APIs** — IntersectionObserver, localStorage, Canvas, requestAnimationFrame

---

## AI Tools Summary

AI tools (Claude by Anthropic) were used throughout all assignments to assist with code generation, debugging, UI/UX suggestions, and documentation. All AI-generated content was reviewed, tested, and modified before inclusion.

See **[docs/ai-usage-report.md](docs/ai-usage-report.md)** for the full report.

---

## Academic Integrity

This project was completed individually in accordance with KFUPM academic integrity policies. AI tools were used as a learning aid and are fully documented as required by the assignment guidelines.

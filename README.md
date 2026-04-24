# 202265440-AbdullahAlzahrani-Assignment3

**Abdullah Alzahrani** | Student ID: 202265440  
Software Engineering — King Fahd University of Petroleum & Minerals (KFUPM)  
Course: SWE Foundation | Assignment 3 — Advanced Functionality

---

## Project Description

This is the third phase of my personal portfolio website, building on Assignments 1 and 2. The goal of this assignment was to strengthen the application with **advanced JavaScript features**, external API integration, complex logic, proper state management, and performance optimizations.

The portfolio showcases my background, featured projects, live GitHub repositories, and a validated contact form — now enhanced with project sorting, a live visit timer, and visitor name persistence across sessions.

**Live Site:** *(Deploy to GitHub Pages — link will appear here once published)*

---

## Features Added in Assignment 3

| Feature | Description |
|---|---|
| **Project Sort** | Sort projects by name A→Z or Z→A, works alongside the existing filter and search |
| **Visit Timer** | Displays how long the current visitor has been on the site, updating every second |
| **Visitor Name** | Visitors can enter their name; it is saved to localStorage and shown as a greeting in the navbar |
| **Visitor Greeting** | Personalized greeting appears in the navigation bar after the visitor saves their name |
| **GitHub API** | Fetches live public repositories using `https://api.github.com/users/Abdullah-Zh/repos`; displays name, description, language, and star count with a static fallback if the request fails |

---

## All Features (Assignments 1–3)

| Feature | Description |
|---|---|
| **Project Filter** | Click tag buttons (Figma, Java, Design Patterns, UML) to filter projects instantly |
| **Project Search** | Type in the search bar to filter projects in real time |
| **Project Sort** | Sort visible projects by name A→Z or Z→A |
| **GitHub API** | Fetches live public repositories with loading, error, and empty states |
| **Form Validation** | Full client-side validation with inline error messages |
| **Scroll Reveal** | Sections animate in as the user scrolls using IntersectionObserver |
| **Theme Toggle** | Light/dark mode persisted to localStorage across sessions |
| **Visit Timer** | Live counter showing how long the visitor has been on the page |
| **Visitor Name** | Saves visitor's name to localStorage and displays a personalized greeting |
| **Particle Canvas** | Interactive animated background that reacts to mouse movement |
| **3D Tilt Effect** | Project cards and profile image tilt based on cursor position |
| **Magnetic Buttons** | Buttons shift slightly toward the cursor for a premium feel |
| **Responsive Design** | Works on mobile, tablet, and desktop |

---

## Folder Structure

```
202265440-AbdullahAlzahrani-Assignment3/
├── index.html                  # Main HTML file
├── README.md                   # This file
├── .gitignore
├── css/
│   └── styles.css              # All styles with CSS variables
├── js/
│   └── script.js               # All JavaScript functionality
├── assets/
│   ├── profile.png             # Profile photo
│   └── Abdullah-Alzahrani-CV.pdf
└── docs/
    ├── ai-usage-report.md      # AI tools documentation
    └── technical-documentation.md  # Technical details
```

---

## Setup Instructions

### Run Locally

This is a **static website** — no build tools, no dependencies, no installation required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdullah-Zh/202265440-AbdullahAlzahrani-Assignment3.git
   ```

2. **Navigate into the folder:**
   ```bash
   cd 202265440-AbdullahAlzahrani-Assignment3
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
4. GitHub Pages will publish the site automatically.

---

## How to Use

After opening the portfolio in your browser:

1. Use the navigation bar to jump to the About, Projects, GitHub, and Contact sections.
2. Watch the hero section for the dynamic greeting that changes based on the time of day.
3. Click the theme toggle to switch between light and dark mode; your preference is saved for future visits.
4. Enter your name in the visitor widget at the bottom of the page and click Save; your name will appear as a greeting in the navbar and be remembered on your next visit.
5. Watch the visit timer in the visitor widget to see how long you have been on the page.
6. In the Projects section, use the filter buttons to show projects by category such as Figma, Java, Design Patterns, or UML.
7. Type in the project search bar to filter projects instantly by matching text.
8. Use the Sort dropdown to reorder visible projects by name A→Z or Z→A.
9. If no project matches the selected filter or search term, a no-results message will appear automatically.
10. Open the GitHub section to view public repositories loaded from the GitHub API, including repository name, description, language, and star count.
11. If the GitHub request fails, the page will still show fallback repository cards so the section does not stay empty.
12. Use the CV section or the hero button to download the PDF resume.
13. Fill out the contact form with your name, email, and message; validation feedback appears immediately for missing or invalid input.
14. Submit the form to see the simulated sending state and the success message after validation passes.
15. Scroll through the page to see reveal animations, the scroll progress indicator, and the scroll-to-top button.
16. On desktop, hover over buttons, cards, and the profile image to see tilt and magnetic motion effects.

---

## Technologies Used

- **HTML5** — Semantic structure, accessibility attributes (ARIA roles, labels)
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, animations, media queries
- **Vanilla JavaScript (ES6+)** — No frameworks or libraries
- **GitHub REST API** — Fetches public repository data dynamically
- **Google Fonts** — DM Serif Display, DM Mono, DM Sans
- **IntersectionObserver API** — Scroll-triggered reveal animations
- **localStorage API** — Theme preference and visitor name persistence
- **Canvas API** — Interactive particle background

---

## API Integration

This project connects to the **GitHub REST API** to fetch and display live repository data.

**Endpoint used:**
```
https://api.github.com/users/Abdullah-Zh/repos?sort=updated&per_page=6
```

**How it works:**
- On page load, the site fetches the 6 most recently updated public repositories from the GitHub account
- Each repository is displayed as a card showing the name, description, language, and star count
- Forked repositories are filtered out so only original work is shown
- If the API request fails (e.g. network error or rate limit), a set of static fallback cards is shown automatically so the section is never empty
- A retry button allows the user to re-fetch without reloading the page

---

## AI Tools Summary

AI tools (Claude by Anthropic) were used to assist with code generation, debugging, and documentation. All AI-generated content was reviewed, understood, and modified before inclusion.

See **[docs/ai-usage-report.md](docs/ai-usage-report.md)** for the full report.

---

## Academic Integrity

This project was completed individually in accordance with KFUPM academic integrity policies. AI tools were used as a learning aid and are fully documented as required by the assignment guidelines.

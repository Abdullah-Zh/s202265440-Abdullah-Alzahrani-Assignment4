# AI Usage Report — Assignment 3

**Student:** Abdullah Alzahrani | **ID:** 202265440  
**Course:** SWE Foundation — Web Engineering  
**Assignment:** 3 — Advanced Functionality  

---

## Tools Used & Use Cases

| Tool | How It Was Used |
|------|----------------|
| **Claude (Anthropic)** | Primary AI assistant used throughout the assignment for code generation, debugging, and logic design |

### Claude — Detailed Usage

- **Project sort feature**: Asked Claude to help implement a combined filter + sort function that re-orders visible DOM cards by name without rebuilding the entire grid.
- **Visit timer**: Used Claude to design a clean `setInterval`-based timer with a human-readable format (e.g., `1m 30s`).
- **Visitor name persistence**: Claude suggested using `localStorage` with a key-value pattern and explained how to restore state on page load.
- **Nav greeting integration**: Claude helped integrate the visitor greeting into the navbar in a way that doesn't break the existing layout on mobile.
- **CSS additions**: Claude generated new utility classes (`sort-bar`, `visitor-widget`, `btn-sm`) following the existing design system's CSS variable conventions.

---

## Benefits & Challenges

### Benefits
- Claude significantly reduced the time needed to implement new features by generating working code scaffolds that matched the existing code style.
- It helped me understand *why* certain patterns work — for example, it explained that re-appending DOM nodes (for sorting) is more performant than rebuilding the grid from scratch.
- The debugging support was valuable: when the visitor greeting wasn't appearing in the nav, Claude identified that the `hidden` class wasn't being removed before the display value was set.

### Challenges
- Claude occasionally generated code that assumed certain DOM elements existed; I had to add null-checks myself.
- Some CSS suggestions used class names that conflicted with existing styles, requiring manual review and renaming.
- I had to remind Claude to follow the existing `DM Mono / DM Sans` font system and CSS variable naming conventions.

---

## Learning Outcomes

- Learned how to combine filtering and sorting on DOM elements efficiently without full re-renders.
- Understood `localStorage` patterns for persisting UI state across sessions.
- Gained confidence using `setInterval` for live UI counters and formatting time durations.
- Improved my ability to critically evaluate AI-generated code — not just accepting it, but checking it against the existing codebase's conventions.

---

## Responsible Use & Modifications

All AI-generated code was reviewed, tested in the browser, and modified before inclusion:

1. **Sort logic**: Claude's initial implementation rebuilt the entire card list on each sort; I modified it to only re-append visible cards, preserving the hidden state of filtered-out cards.
2. **Timer formatting**: I adjusted the format string from `mm:ss` to a more readable `Xm Ys` style.
3. **Visitor greeting**: The original suggestion put the greeting below the form; I moved it to the navbar for better visibility and UX.
4. **CSS**: All generated styles were manually checked against the existing design tokens and reformatted for consistency.

I understand every line of code in this submission and can explain any part of it.

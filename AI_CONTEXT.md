# AI Context — Imperium Maledictum Quick Reference

> **Language policy:** This project is **100% English** for an international audience.
> Never introduce French text, comments, or data. All UI strings, variable names,
> documentation, and JSON content must remain in English.

---

## Project Overview

A lightweight **React 19 + TypeScript + Vite** static site that serves as a
searchable quick-reference for the _Imperium Maledictum_ tabletop RPG (40k-era
science-fiction by Cubicle 7 / Games Workshop).

- **Deployed at:** <https://ppiques.github.io/imperium-maledictum-quickref>
- **License:** CC BY-NC 4.0 (fan-made, non-commercial)
- **Purpose:** Help players look up talents, skills, weapons, armour, psychic
  powers, augmetics, services, and other game tables during sessions.

---

## Tech Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Framework | React 19 (functional components, hooks) |
| Language  | TypeScript 5.7                          |
| Bundler   | Vite 6                                  |
| Routing   | react-router-dom v7                     |
| UI        | Bootstrap 5.3 (CDN) + custom CSS        |
| Data      | Local JSON files (`src/data/*.json`)    |
| Linting   | ESLint 9 + typescript-eslint            |

---

## Directory Structure

```
src/
├── App.tsx                       # Router + SourceFilterProvider wrapper
├── main.tsx                      # Entry point (creates root, renders <App>)
├── components/
│   ├── Navbar.tsx                # Top navigation bar with page links
│   ├── Footer.tsx                # Disclaimer + credits footer
│   ├── SearchBar.tsx             # Reusable text-search input
│   ├── SourceFilter.tsx          # Toggle chips for source books
│   ├── Table.tsx                 # Sortable/filterable data table (core component)
│   └── Tooltip.tsx               # Hover tooltip for trait descriptions
├── contexts/
│   └── SourceFilterContext.tsx   # Global source-book filter state
├── data/                         # ~35 JSON files with Imperium Maledictum data
├── pages/
│   ├── Home.tsx                  # Landing page + name table
│   ├── Weapons.tsx               # Melee + ranged weapons + mods + ammo + explosives
│   ├── Protection.tsx            # Armour + mods + force fields
│   ├── Equipment.tsx             # Clothing, tools, provisions, med equipment
│   ├── Augmetics.tsx             # Augmetic implants
│   ├── Services.tsx              # Accommodations, medical, travel tables
│   ├── Psy.tsx                   # Psychic powers + phenomena + warp perils
│   ├── Combat.tsx                # Actions, conditions, wounds, injuries, fumbles, hit locations
│   ├── Talents.tsx               # Talents, skills, XP costs
│   └── CriticalWounds.tsx        # Critical wound tables + injury details
└── styles/
    ├── App.css                   # Global styles
    └── *.css                     # Per-page component styles
```

---

## Architecture Details

### Routing (`App.tsx`)

- Uses `react-router-dom` `<BrowserRouter>` with basename
  `/imperium-maledictum-quickref` (GitHub Pages sub-directory deploy).
- All pages are wrapped in `<SourceFilterProvider>` for global filtering.
- `<Navbar />` and `<Footer />` are persistent; content routes render between.

| Route             | Page Component |
| ----------------- | -------------- |
| `/`               | Home           |
| `/weapons`        | Weapons        |
| `/protection`     | Protection     |
| `/equipment`      | Equipment      |
| `/augmetics`      | Augmetics      |
| `/services`       | Services       |
| `/psy`            | Psy            |
| `/combat`         | Combat         |
| `/talents`        | Talents        |
| `/criticalwounds` | CriticalWounds |

### Data Layer

- All game data lives as **static JSON** under `src/data/`.
- Each JSON file exports one or more arrays of row objects.
- Common fields across data files:
  - `Source` — source book string (e.g. `"Core Rulebook"`,
    `"Adeptus Mechanicus Player's Guide"`, `"Inquisitor Player's Guide"`,
    `"Macharian Requisition Guide"`). Used by the source filter.
  - Column names are **English strings** matching in-game terminology.

### Source Filter System

- Defined in `src/contexts/SourceFilterContext.tsx`.
- Four source books available: **core**, **mechanicus**, **inquisitor**,
  **macharian**.
- All active by default; toggled via UI chips in `SourceFilter.tsx`.
- `filterData<T>()` generic helper — every `<Table>` calls it before
  rendering so the filter applies site-wide.

### Table Component (`components/Table.tsx`)

The workhorse component. Key features:

1. **Sorting** — Click column headers to sort. Custom comparators exist for:
   - `Availability` (common → scarce → rare → exotic)
   - `Difficulty` (Easy → Hard ordered list)
   - `Requirement` (parsed: advances-only < characteristic < special)
   - Numeric columns (`Cost`, `Damage`, `Armour`, `Magazine`, etc.)
   - `disableSorting={true}` option for fixed tables (XP costs).
2. **Tooltip on hover** — Reads `traits.json` and `conditions.json` for
   descriptions of trait names in parentheses.
3. **Discipline colour-coding** — Row classes derived from a
   `Discipline` column (used for psychic powers).

---

## Conventions & Rules for AI-Assisted Edits

### General Rules

1. **English only.** No French in code, comments, strings, or JSON data.
2. **Naming** — Components: PascalCase (e.g. `SearchBar`). Files match
   component names. Data files: camelCase JSON names (e.g. `talents.json`).
3. **Data additions** — New game tables go into `src/data/*.json`. Add a
   corresponding page in `src/pages/`, register the route in `App.tsx`,
   add a nav link in `Navbar.tsx`, and a CSS file in `src/styles/`.
4. **Source filter** — If data from a new source book is added, register
   it in `SOURCE_BOOKS` and `sourceLabelMap` inside
   `SourceFilterContext.tsx`.
5. **Styling** — Page-specific CSS co-located in `src/styles/`; component
   CSS alongside the component. Use class-based CSS (no CSS-in-JS).
6. **Bootstrap** — Only used via CDN classes in JSX (no JS imports
   required). Do not add Bootstrap JS dependencies.
7. **No backend** — The app is fully static; all data is bundled at build
   time. Keep it that way.

### Important Constraints

- **Before any modification:** Read the affected files, summarize the
  problem/objective, propose a short plan, and wait for validation if the
  change touches multiple files or business data.
- **Minimal changes:** Make only the minimal change necessary. Explain the
  diff after modification and indicate which commands to run to verify.
- **No rewrites:** Do not rewrite large files without a clear, justified reason.
- **No global architecture changes:** Never change the global architecture
  without proposing a plan first.
- **Ask if unsure:** If information is missing, ask a question instead of guessing.

### Code Style

- Keep code simple and readable.
- Prefer small, clearly named functions.
- Avoid unnecessary abstractions.
- Respect the existing project style.
- Never mix refactoring and functional changes in the same modification.

### Business Data Rules (`src/data/*.json`)

- **Preserve IDs:** Never change existing IDs.
- **Exact names:** Preserve exact in-game terminology and field names.
- **No invented values:** Never invent values for game tables.
- **Flag inconsistencies:** If you spot a data inconsistency, flag it to
  the user instead of auto-correcting it.
- **Explicit listing:** Any modification to business data must be explicitly
  listed and justified.

---

## Build & Run

```bash
npm install
npm run dev        # Local dev server (Vite)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

---

## Recommended AI Workflow

| Task Type  | Procedure                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Analysis   | Read `AI_CONTEXT.md`, analyze the project structure, and identify the issue. Do not modify files.     |
| Correction | Read `AI_CONTEXT.md`. Fix only the specified problem. Limit changes to necessary files. Explain diff. |
| Refactor   | Read `AI_CONTEXT.md`. Propose a file-by-file refactoring plan. Apply nothing without validation.      |
| Data Edit  | Read `AI_CONTEXT.md`. List every JSON/YAML change explicitly. Wait for confirmation before applying.  |

## Strict Prohibitions

**Never do the following without explicit user confirmation:**

- Delete any files.
- Rename public or important folders.
- Massively modify JSON or YAML data files.
- Change the package manager (`npm`).
- Add heavy or unnecessary dependencies.
- Change the global project structure.
- Run long, blocking, or destructive terminal commands.
- Scan the disk or folders outside the project directory.

---

## Third-Party Attributions

- **Imperium Maledictum** © Cubicle 7 Entertainment Ltd / Games Workshop Ltd.
  This is an unofficial fan tool.
- **Bootstrap 5** — MIT License (loaded via CDN).
- Project code licensed under **CC BY-NC 4.0**.

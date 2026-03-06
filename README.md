# Imperium Maledictum Quick Reference

## https://ppiques.github.io/imperium-maledictum-quickref

A lightweight **React + TypeScript + Vite** application that provides easy access to the data tables used
in the *Imperium Maledictum* role‑playing game.  The site serves as a searchable reference for talents, skills,
weapons, armour, psychic powers, and other game elements.

Data is stored as JSON under `src/data` and rendered with reusable components such as `Table` and `SearchBar`.
The project is intended for quick deployment as a static site.

---

## 🛠 Getting started

```bash
# install dependencies
npm install

# start development server with hot reload
npm run dev
```

Visit http://localhost:3000 and navigate through the pages in the sidebar.
Search and sort any column; the `Requirement` column now sorts logically (no requirement first,
then advances-only, then characteristic requirements).

Changes you make to `src/` files automatically reload the browser.

## 📁 Project structure

- `src/pages/` – individual page components (Home, Talents, Weapons, etc.)
- `src/components/` – reusable UI pieces (`Table.tsx`, `SearchBar.tsx`, etc.)
- `src/data/` – JSON datasets driving the tables
- `src/styles/` – per-page and component CSS
- `public/` – static assets and fallback HTML

## ✅ Features

- Live search across talents, skills, and more
- Sortable tables with custom logic (e.g. requirements, availability, difficulty)
- Hover tooltips for trait descriptions
- Responsive layout with simple navigation

## 🧪 Testing changes locally

Run the development server (see above).  No git push required – you can verify any modification
immediately in the browser.

## 📦 Building for production

```bash
npm run build   # outputs to dist/
```

Deploy the `dist` folder to your favourite static hosting provider.

## 🙌 Contributions

Feel free to adjust data files, add new pages, or improve sorting/search behavior.
This repo is a personal quick‑reference project, so pull requests are welcome but not required.
Furthermore, if you spot any mistakes in the data, feel free to open an issue about it.

## 📜 License

This project is released under the **CC0 1.0 Universal** license, dedicating all content to the public domain. See [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).


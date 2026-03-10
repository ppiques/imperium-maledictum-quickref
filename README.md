# Imperium Maledictum Quick Reference

## https://ppiques.github.io/imperium-maledictum-quickref

A lightweight **React + TypeScript + Vite** application that provides easy access to the data tables used
in the *Imperium Maledictum* role‑playing game.  The site serves as a searchable reference for talents, skills,
weapons, armour, psychic powers, and other game elements.

Data is stored as JSON under `src/data` and rendered with reusable components such as `Table` and `SearchBar`.
The project is intended for quick deployment as a static site.

I hope it can be of help during your adventures in the grim darkness of the 41st Millenium.

## ⚠️ Disclaimer

*Imperium Maledictum* is not my proprietary work. This project is a fan-made reference tool and can be removed at any time upon request from the rights holder.

Imperium Maledictum is © Cubicle 7 Entertainment Ltd and
Games Workshop Ltd.

This is an unofficial fan-made reference and is not affiliated
with or endorsed by Cubicle 7 or Games Workshop.

---

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

## 🙌 Contributions

Feel free to adjust data files, add new pages, or improve sorting/search behavior.

This repo is a personal quick‑reference project, so pull requests are welcome but not required.

Furthermore, if you spot any mistakes in the data, feel free to open an issue about it.

## 📜 License

This project is released under the **CC0 1.0 Universal** license, dedicating all content to the public domain. See [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).


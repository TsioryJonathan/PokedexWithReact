# React Pokédex

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)
![PokeAPI](https://img.shields.io/badge/PokeAPI-FFDE00?logo=pokeapi&logoColor=white&style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)

> An interactive, animated Pokédex built with React, Tailwind CSS & Framer Motion.  
> Browse, search and view detailed stats for over 1,000 Pokémon via the official PokéAPI.
> Integrated dark/light Theme.

---

## 🌐 Live Demo

[🔗 Deployed on Vercel](https://pokedex-with-react-one.vercel.app)

---

## 📸 Showcase

### 🧭 Hero Section
![Hero Section](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/hero.PNG)

### 📋 Pokédex List
![Pokédex Section](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/pokedex.PNG)

### 🔍 Pokémon Detail Modal
![Detail Modal](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/details.PNG)

### ⚔️ Compare Pokémon
![Compare Pokémon](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/compare.PNG)

### ⭐ Favorite List
![Favorites](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/favorite.PNG)

### 🔎 Search Input
![Search](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/research.PNG)

### 📄 Pagination System
![Pagination](https://raw.githubusercontent.com/TsioryJonathan/PokedexWithReact/develop/public/pagination.PNG)


---

## 🚀 Features

- **Hero Slide**

  - 3D tilt effect on hover
  - Dynamic gradient background by primary type
  - “Legendary” / “Mythical” badge
  - Cry button to play Pokémon sound
  - “View Profile” opens modal

- **Detail Modal**

  - **GlobalDetail**: name, genus, types, description, cry
  - **Tabs (with icons)**:
    - About
    - Base Stats (animated bars & circles)
    - Evolution Chain
    - Moves (searchable, paginated, with icons)

- **Pokédex List**

  - Debounced search input with clear button
  - Numbered pagination (window of 10 pages)
  - Persists last page in `localStorage`
  - Responsive grid: 12 cards per page
  - Custom loading spinner & logo

- **Reusable Components**
  - Buttons, Inputs, Badges, Modals, StatChart, CryButton, etc.

---

## 🛠 Tech Stack

- **Framework**: React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: lucide‑react, Material Icons
- **Charts**: react-circular-progressbar
- **API**: [PokéAPI](https://pokeapi.co/)
- **Deployment**: Vercel

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/TsioryJonathan/PokedexWithReact.git
   cd PokedexWithReact
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── HeroSlide.jsx
│   ├── GlobalDetail.jsx
│   ├── PokeDetailModal.jsx
│   ├── PokemonMoves.jsx
│   ├── BaseStatsContent.jsx
│   ├── PokemonList.jsx
│   ├── SearchInput.jsx
│   ├── ...
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── ModalBase.jsx
│   └── ...
├── hooks/
│   ├── usePokemonList.js
│   └── usePokemonDetails.js
│   └── ...
├── utils/
│   ├── getTypeAccent.js
│   └── pokemonColors.js
├── constants/
│   └── SummaryStats.js
└── App.jsx
```

---

## 🔧 Configuration & Customization

- **Type Colors**: edit `src/utils/pokemonColors.js`
- **Stat Order**: modify `STAT_ORDER` in `src/constants/SummaryStats.js`
- **Pagination Window**: adjust visible pages (default 10) in `PokemonList.jsx`
- **Animation Settings**: tweak Framer Motion variants (`fade`, `stagger`, etc.)

---

---

## 🔗 Credits

- **Data**: [PokéAPI](https://pokeapi.co/)
- **Icons**: Lucide & Material Icons
- **Badges**: Shields.io

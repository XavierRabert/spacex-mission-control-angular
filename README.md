# 🚀 SpaceX Mission Control (Angular)

A futuristic **dark sci-fi dashboard** built with **Angular 21**, powered by the public **SpaceX REST API**.

This project is designed as a personal portfolio application to showcase:

- Modern Angular standalone architecture
- Signals + ngxtension reactive patterns
- TailwindCSS futuristic UI design
- Smooth GSAP animations
- Clean and scalable project structure

---

## ✨ Preview

> Dark sci-fi inspired UI with SpaceX launches, rockets, and mission details.

(Coming soon: screenshots + live demo)

---

## 🛰️ Features (MVP Roadmap)

- 🚀 Launches list (past + upcoming)
- 🔍 Search and filters
- 📄 Launch detail page
- ⭐ Favorite missions (local storage)
- 🧩 Rockets & crew sections
- 🎞️ GSAP animations and transitions
- 📱 Fully responsive design

---

## 🧱 Tech Stack

| Technology        | Description                                       |
| ----------------- | ------------------------------------------------- |
| **Angular 21**    | Standalone components + Signals                   |
| **pnpm**          | Fast and efficient package manager                |
| **TailwindCSS**   | Utility-first styling for futuristic UI           |
| **ngxtension**    | Modern reactive helpers (`derivedAsync`, signals) |
| **GSAP**          | High-performance animations                       |
| **SpaceX API v4** | Public REST API for mission data                  |

---

## 📡 Data Source

This project uses the free SpaceX API:

- Base URL: `https://api.spacexdata.com/v4`
- Documentation: https://github.com/r-spacex/SpaceX-API

---

## ⚙️ Getting Started

### ✅ Requirements

Make sure you have installed:

- Node.js (v18+ recommended)
- Angular CLI (latest)
- pnpm

---

### 📦 Install pnpm

```bash
npm install -g pnpm
```

### 🚀 Install dependencies

```bash
pnpm install
```

### 🗂️ Project Structure

```bash
src/app
  core/
    api/            # SpaceX API services
    models/         # TypeScript interfaces
    layout/         # Navbar + shell layout

  features/
    launches/       # Launch list + cards
    launch-detail/  # Mission detail page
    rockets/        # Rockets section
    favorites/      # Saved missions

  shared/
    ui/             # Reusable UI components
```

### 🎞️ Animations

GSAP is used for:

- Launch card entrance animations
- Page transitions
- Scroll-trigger effects (coming soon)

```typescript
gsap.from('.launch-card', {
  opacity: 0,
  y: 40,
  stagger: 0.1,
  duration: 0.8,
});
```

### 📌 Portfolio Goals

This project is part of my Angular portfolio to demonstrate:

- Real-world API integration
- Scalable frontend architecture
- Modern UI/UX + animations
- Best practices with Angular Signals

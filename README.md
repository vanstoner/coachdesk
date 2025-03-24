

# CoachDesk

🎯 CoachDesk is a grassroots football match tracking assistant built with React, Tailwind CSS and Playwright.

## 📦 Features

- Match Manager: Plan and track matches (date, opponent, deletion)
- Player Manager: Add players, assign positions, track presence
- Structured UI with accessibility-friendly labelling
- Local IndexedDB (via Dexie) with future sync-to-cloud plans
- Playwright E2E test suite with test DB isolation

## 🛠 Tech Stack

- React + Vite
- Tailwind CSS
- Dexie.js (IndexedDB wrapper)
- Playwright (end-to-end testing)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the app locally**
   ```bash
   npm run dev
   ```

3. **Run tests**
   ```bash
   npm run test
   ```

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_DB_NAME=CoachDeskDB
```

## 📂 Project Structure

```
├── components/
│   ├── PlayerManager.jsx
│   └── MatchManager.jsx
├── db/
│   └── localDB.js
├── tests/
│   ├── players.spec.js
│   ├── matches.spec.js
│   └── fixtures/
├── App.jsx
├── index.html
├── .env.example
└── README.md
```

## 📋 Todo (Next Iterations)

- Event Logger for real-time match observations
- Quarter tracking and playtime analytics
- Cloud sync of match and player data
- Role-based login and team dashboards

## 📄 Licence
MIT or your choice.

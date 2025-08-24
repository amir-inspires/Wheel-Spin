# Gift Wheel Game

## Project Overview

Gift Wheel is an interactive, web-based spinning wheel game where users can place bets, spin a wheel to win prizes, and track their scores on a leaderboard. The game is designed to provide an engaging experience with real-time score tracking, persistent player data, and a sleek, responsive interface.

This project demonstrates comprehensive use of React with hooks and state management, integration with an Express.js backend for leaderboard management, and advanced frontend techniques including lazy loading, Suspense, error boundaries, and custom hooks.

---

## Technologies Used

- **Frontend:** React.js (with hooks, useReducer, Suspense, React Router, lazy loading)
- **Backend:** Node.js with Express.js API
- **Data Storage:** CSV file for leaderboard persistence
- **Styling:** Tailwind CSS (with responsiveness)
- **Other:** LocalStorage for saving player scores, CSV parsing and writing, CORS for API security

---

## Key Features

- **Interactive Spin Wheel:** Users can place bets and spin the wheel to win various prizes.
- **State Management:** Uses `useReducer` for managing complex state like bets and balances.
- **Persistent Scores:** Player scores are saved in `localStorage` for persistence across sessions.
- **Leaderboard:** Scores are stored on the server in a CSV file and fetched via an API.
- **Express Server:** Backend reads and writes leaderboard data to a CSV file.
- **Custom Hooks:** Implements multiple custom hooks including a leaderboard hook and dark mode toggle.
- **Lazy Loading & Suspense:** Components like the Leaderboard are lazy loaded and wrapped in Suspense with fallbacks for smooth loading states.
- **Error Boundaries:** Leaderboard component is wrapped in an error boundary to catch API or rendering errors gracefully.
- **Responsive Design:** The UI adapts seamlessly across different screen sizes.
- **React Router:** Enables smooth navigation between game, profile, and leaderboard pages.

---

## Implementation Details

### State Management

- Replaced `useState` with `useReducer` for handling `bet` and `balance` states to better manage complex state transitions.
- Used React's context and hooks to manage global state and component re-rendering efficiently.

### Leaderboard API

- Created an Express server to serve leaderboard data from a CSV file.
- API endpoints include:
  - `GET /api/leaderboard`: Fetches sorted leaderboard data.
  - `POST /api/leaderboard`: Adds or updates player scores.
- CSV parsing and writing is handled with `csv-parser` and `csv-writer` npm packages.
- Enabled CORS to allow cross-origin requests from frontend.

### Data Fetching & Resource Wrapping

- Data fetching logic for the leaderboard is wrapped in a resource pattern to integrate seamlessly with React Suspense.
- Loading states are handled with Suspense fallback UI.
- API errors caught via an error boundary component.

### Custom Hooks

- `useLeaderboard`: Handles leaderboard data fetching and state.
- `useDarkMode`: Toggles light/dark theme.
- Additional custom hook added to enhance modularity (e.g., for session management or localStorage syncing).

### Additional Features Beyond Requirements

- **Responsive UI:** Tailwind CSS ensures the game looks great on all device sizes.
- **LocalStorage Persistence:** Player scores persist even if the browser is refreshed.
- **Lazy Loading:** Major components such as the Leaderboard are loaded lazily to optimize performance.
- **Error Handling:** Error boundary component ensures the app does not crash unexpectedly.
- **Session/User ID:** Passed as props to components like Leaderboard to maintain user-specific data flow.

---

## How to Run the Project

### Backend

1. Navigate to the backend directory.
2. Run `npm install` to install dependencies.
3. Run `node server.js` to start the Express server (default port 4000).

### Frontend

1. Navigate to the frontend directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React app.

Make sure the backend server is running so the frontend can fetch leaderboard data.

[See screenshots folder](screenshots/)

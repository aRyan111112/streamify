# Streamify

Streamify is a full-stack web application for connecting language learners via chat and video calls.

## Project Structure

```
backend/
  src/
    controllers/
    lib/
    middlewares/
    models/
    routes/
    server.js
  .env
  package.json
frontend/
  src/
    pages/
    lib/
    App.jsx
    main.jsx
    index.css
  public/
  package.json
  tailwind.config.js
  vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (cloud/local)
- [Stream Chat](https://getstream.io/chat/) API credentials

### Backend

1. Copy `.env` and fill in your secrets (see `.env.example` if available).
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

### Frontend

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- User authentication (signup, login, logout)
- Onboarding with profile setup
- Friend requests and management
- Real-time chat and video calls (via Stream API)
- Responsive UI with Tailwind CSS and DaisyUI

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, React Query, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Stream Chat
- **Other:** ESLint, PostCSS

## Scripts

### Backend

- `npm run dev` — Start backend with nodemon

### Frontend

- `npm run dev` — Start frontend dev server
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

## License

MIT

---

**Note:**  
Do not commit your `.env` files or other secrets to version control.

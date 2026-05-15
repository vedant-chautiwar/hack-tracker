# Hack-Tracker

Hack-Tracker is a personal MERN app for tracking your hackathon journey. It is designed for one owner, not public registration or multi-user onboarding.

## Features

- Single-user login with `name` and `password`
- JWT authentication with localStorage session persistence
- Protected dashboard and hackathon routes
- Startup seed logic that creates your personal login user if it does not exist
- Add, view, edit, and delete hackathons
- Dashboard statistics for total, upcoming, attended, and wins/finalists
- Recent hackathons and upcoming reminder
- Search by title or organizer
- Filter by status and mode
- Sort by start date
- Responsive warm editorial UI with subtle loading skeletons

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Context API, Axios
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT, bcrypt

## Folder Structure

```text
hack-tracker/
  backend/
    config/
      db.js
      seedAdmin.js
    controllers/
    middleware/
    models/
    routes/
    server.js
    .env.example
  frontend/
    src/
      api/
      components/
      context/
      pages/
      utils/
      App.jsx
      main.jsx
      index.css
    .env.example
  package.json
  README.md
```

## Environment Variables

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hacktracker
JWT_SECRET=replace_this_with_a_long_random_secret
PORT=5000
ADMIN_NAME=admin
ADMIN_PASSWORD=hacktracker123
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

The backend prints the created login credentials in the terminal on startup:

```text
Personal login user created:
  name: admin
  password: hacktracker123
```

Change `ADMIN_NAME` and `ADMIN_PASSWORD` in `backend/.env` if you want private credentials.

## MongoDB Setup

Database name:

```text
hacktracker
```

Connection string format for `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/hacktracker
```

Create the database in `mongosh`:

```js
use hacktracker
db.createCollection("users")
db.createCollection("hackathons")
```

You normally do not need to insert the demo/admin user manually because the backend seeds it on startup.

Manual insert if needed:

```js
use hacktracker
db.users.insertOne({
  name: "admin",
  password: "$2a$10$mHgEoAnn1X.WqDHGCf5bJ.73O..0HN0gb9gbgDYfdeAVYeRTGD50C",
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0
})
```

That manual password hash is for:

```text
hacktracker123
```

## Run Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Run Both From Root

```bash
npm run install-all
npm run dev
```

## API Routes

Auth:

- `POST /api/auth/login`
- `GET /api/auth/me`

Hackathons:

- `GET /api/hackathons`
- `GET /api/hackathons/:id`
- `POST /api/hackathons`
- `PUT /api/hackathons/:id`
- `DELETE /api/hackathons/:id`

All hackathon routes require a JWT bearer token.

## Future Improvements

- Add calendar export
- Add file uploads for project screenshots
- Add pagination for long hackathon histories
- Add a compact archive view for older events

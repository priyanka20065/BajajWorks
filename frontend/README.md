# Chitkara Full Stack Engineering Challenge

A Full Stack application built using **Node.js, Express, React, and Vite** that accepts hierarchical node relationships, detects trees, cycles, duplicates, invalid inputs, and returns structured JSON according to the challenge specification.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- CORS

### Frontend
- React
- Vite
- Axios

### Hosting
- Backend: Render
- Frontend: Vercel

---

## Project Structure

```
chitkara-fullstack/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   │   └── bfhl.js
│   └── utils/
│       └── hierarchy.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       └── components/
│           ├── Tree.jsx
│           ├── Summary.jsx
│           └── ResponseCard.jsx
│
└── README.md
```

---

## Backend Installation

```bash
cd backend

npm install

npm start
```

Backend runs on

```
http://localhost:3000
```

---

## Frontend Installation

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Endpoint

### POST

```
/bfhl
```

Content-Type

```
application/json
```

---

## Sample Request

```json
{
  "data": [
    "A->B",
    "A->C",
    "B->D",
    "C->E",
    "E->F",
    "X->Y",
    "Y->Z",
    "Z->X",
    "G->H",
    "G->H",
    "hello",
    "1->2",
    "A->"
  ]
}
```

---

## Sample Response

```json
{
  "user_id": "yourname_ddmmyyyy",
  "email_id": "yourcollegeemail@chitkara.edu.in",
  "college_roll_number": "your_roll_number",
  "hierarchies": [],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 0,
    "total_cycles": 0,
    "largest_tree_root": ""
  }
}
```

---

## Features

- Validates node format
- Detects invalid entries
- Removes duplicate edges
- Handles multiple independent trees
- Detects graph cycles
- Calculates tree depth
- Finds largest tree root
- Supports multiple connected components
- Returns response according to challenge specification
- Responsive React frontend
- Error handling
- CORS enabled

---

## Deployment

### Backend (Render)

1. Push backend code to GitHub.
2. Create a new Web Service on Render.
3. Connect the repository.
4. Root Directory: `backend`
5. Build Command

```
npm install
```

6. Start Command

```
npm start
```

Example URL

```
https://your-backend.onrender.com
```

---

### Frontend (Vercel)

1. Push frontend code to GitHub.
2. Import the project into Vercel.
3. Set Root Directory to

```
frontend
```

4. Build Command

```
npm run build
```

5. Output Directory

```
dist
```

6. Update `App.jsx` with your deployed backend URL:

```javascript
const API_URL = "https://your-backend.onrender.com/bfhl";
```

---

## Author

**Name:** Your Name

**College:** Chitkara University

**Email:** yourcollegeemail@chitkara.edu.in

**Roll Number:** Your Roll Number

---

## License

This project is created solely for the Chitkara Full Stack Engineering Challenge.
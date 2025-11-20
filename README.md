# Full-Stack Expense Tracker

A full-stack expense tracking web app with user authentication and private user data.

###  Live Demo
**Frontend:** https://expense-tracker-git-main-jayden-hamisis-projects.vercel.app/  
**Backend API:** https://expense-tracker-y85w.onrender.com

---

### Features
- Create an account & log in securely
- JWT authentication to protect data
- Add, edit, and delete expenses
- Each user sees **only their own** expenses
- Fully deployed & accessible online

---

### Tech Stack
| Layer | Tech |
|------|------|
| Frontend | React (Vite/CRA), Fetch API |
| Backend | FastAPI, JWT Auth |
| Database | SQLite (SQLAlchemy ORM) |
| Deployment | Backend: Render • Frontend: Vercel |

---

### API Endpoints (Protected with Bearer Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Log in & receive JWT |
| GET | `/expenses` | Get user expenses |
| POST | `/expenses` | Create expense |
| PUT | `/expenses/{id}` | Edit expense |
| DELETE | `/expenses/{id}` | Delete expense |

---

###  What I Learned
- How JWT authentication actually works
- How the backend & frontend communicate securely
- State management and API calls in React
- Securing database resources by user ownership
- Deploying full-stack apps to Render & Vercel

---

###  Future Improvements 
- Replace SQLite with PostgreSQL
- Add monthly totals / charts
- Better styling / animations

---

###  Status
**Project complete and deployed.**  
This is my first full-stack application and a foundation for much bigger builds.

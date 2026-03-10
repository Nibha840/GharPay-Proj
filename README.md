# GharPayy Lead Conversion System (CRM)

A full-stack Lead Conversion CRM designed to manage property inquiries, track customer leads through a sales pipeline, and coordinate property visits between agents and potential tenants.

This system simulates a real-world CRM used by property platforms to efficiently handle incoming leads and improve lead conversion rates.

---

## 🚀 Features

### Lead Management
- Capture leads from multiple sources (Website, Phone, WhatsApp, Social Media)
- Store customer details and enquiry information
- Automatically assign leads to agents

### Sales Pipeline
Track lead progress through stages:

`New → Contacted → Requirement → Suggested → Visit Scheduled → Visit Done → Booked / Lost`

Agents can easily move leads across stages.

### Visit Scheduler
- Schedule property visits for leads
- Select property name, date and time
- Track upcoming visits
- Record visit outcomes

### Dashboard Analytics
Provides an overview of system activity including:

- Total leads
- Pipeline distribution
- Visits scheduled
- Confirmed bookings
- Lead activity insights

### Agent Leaderboard
Ranks agents based on their performance:

- Leads handled
- Visits scheduled
- Bookings completed

---

## 🏗 System Architecture

The application follows a **full-stack architecture**.

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React + Vite + TailwindCSS + shadcn/ui |
| Backend    | Node.js + Express.js                |
| Database   | MongoDB                             |
| API        | RESTful APIs for lead management, visits, and analytics |

---

## 📂 Project Structure

```
project-root/
│
├── pg-lead-hub-main/          # Frontend (React + Vite)
│
├── server/                    # Backend API
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Nibha840/GharPay-Proj.git
cd GharPay-Proj
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env.example` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gharpayy_crm
```

Run the backend:

```bash
npm start
```

### Frontend Setup

```bash
cd pg-lead-hub-main
npm install
npm run dev
```

Frontend will run on: [http://localhost:5173](http://localhost:5173)

---

## 📊 Workflow

Typical system workflow:

1. Add new lead
2. Lead automatically assigned to agent
3. Move lead across pipeline stages
4. Schedule property visit
5. Track visits and outcomes
6. Monitor performance in dashboard
7. View agent rankings in leaderboard

---

## 🧠 Design Decisions

- **MongoDB** used for flexible schema for leads and activities
- **REST API** architecture for clear separation of frontend and backend
- **Modular backend** structure (controllers, services, routes)
- **React component-based UI** for scalability

---

## 🔮 Future Improvements

- Real-time updates using WebSockets
- AI lead insights and summaries
- Notification system for visit reminders
- Role-based authentication for agents/admin
- Mobile responsive CRM dashboard

---

## 👩‍💻 Author

**Nibha Kumari**

- [GitHub](https://github.com/Nibha840)
- [LinkedIn](https://www.linkedin.com/in/nibha-kumari-3a212828a/)

---

## 📌 Assignment Note

This project was developed as part of a CRM system assignment to demonstrate lead management, sales pipeline tracking, and property visit scheduling capabilities.

# Gharpayy CRM Server

## Overview
This is the backend API for the Gharpayy Lead Management CRM. It provides RESTful endpoints to manage leads, visits, agents, and populate the dashboard. It also features a scheduled cron job (via `node-cron`) for managing follow-up reminders.

## Tech Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database (using Mongoose for object modeling)
- **Socket.io**: Real-time communication
- **node-cron**: Task scheduling

## Prerequisites
- Node.js (v14 or higher recommended)
- MongoDB running locally or a MongoDB Atlas URI

## Setup & Run

1. **Install dependencies:**
   Make sure you are in the `server` directory, then run:
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in this directory with the following base configuration:
   ```env
   PORT=5000
   # Add your MongoDB connection string and other secrets here
   ```

3. **Start the server:**
   - For development (auto-restarts on code changes using nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## API Structure
The API is grouped into the following main routes:
- **`GET /api/health`**: Health check endpoint to verify server status.
- **`/api/leads`**: Endpoints for Lead creation, retrieval, updates, and deletion.
- **`/api/visits`**: Endpoints for tracking tracking property visits.
- **`/api/dashboard`**: Endpoints aggregating data for frontend dashboard visualizations.
- **`/api/agents`**: Endpoints to manage agent profiles and assignments.

## Background Services
- **Reminder Service (`/services/reminderService.js`)**: A background job automatically manages follow-up reminders based on lead status and scheduled follow-ups.

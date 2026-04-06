# Church Management System

A full-stack web application for managing church members, events, donations, and attendance.

## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB

## Features
- Authentication (Admin/Member login and signup with approval)
- Member Management
- Events Management
- Donations Tracking
- Attendance Tracking
- Admin Dashboard

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Update `.env` file with your MongoDB URI and JWT secret.

4. Start MongoDB service (if local):
   ```
   mongod
   ```

5. Run the backend server:
   ```
   npm run dev
   ```
   Server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```
   App will run on http://localhost:3000

### Initial Setup
1. Run the seed script to create an admin user:
   ```
   cd backend
   node seed.js
   ```
2. Login with admin credentials (username: admin, password: admin123)
3. Members can signup and login immediately

## API Endpoints
- POST /api/auth/login - User authentication
- POST /api/auth/signup - User registration (auto-approved for members)
- POST /api/auth/register - Register new user (admin only)
- GET /api/auth/pending - Get pending user approvals (admin)
- PUT /api/auth/approve/:id - Approve user account (admin)
- PUT /api/auth/reject/:id - Reject user account (admin)
- GET /api/members - Get all members
- POST /api/members - Add new member (admin)
- GET /api/events - Get all events
- POST /api/events - Add new event (admin)
- GET /api/donations - Get all donations
- POST /api/donations - Add new donation (admin)
- GET /api/attendance - Get all attendance
- POST /api/attendance - Mark attendance (admin)

## Folder Structure
```
church-management/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── pages/
    │   ├── App.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Security Notes
- JWT tokens are used for authentication.
- Passwords are hashed with bcrypt.
- Admin routes are protected with middleware.

## Future Enhancements
- M-Pesa integration for payments
- Email notifications
- Reports and analytics
- Mobile app

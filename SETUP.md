# Setup Instructions - Smart Leads Dashboard

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Local Development Setup

### 1. Clone the Repository
git clone https://github.com/Dutta-Raj/Smart_leads-.git
cd Smart_leads-

### 2. Backend Setup
cd backend
npm install

# Create .env file
copy .env.example .env
# Edit .env with your MongoDB credentials

# Start backend
npm run dev
# Runs on http://localhost:5000

### 3. Frontend Setup
cd frontend
npm install

# Start frontend
npm run dev
# Runs on http://localhost:5173

### 4. Access Application
Open http://localhost:5173 in your browser
Register first user (becomes admin automatically)

## Live Deployment URLs

| Service | URL |
|---------|-----|
| Frontend | https://dutta-smart-leads.netlify.app |
| Backend API | https://smart-leads-53ls.onrender.com |

## Test Credentials
Email: raj104@gmail.com
Password: Admin@123

## Environment Variables

Create ackend/.env file:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development

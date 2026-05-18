powershell
cd C:\Users\KIIT\Desktop\smart-leads-dashboard

# Create comprehensive README.md
@'
# 🚀 Smart Leads Dashboard

> A production-ready full-stack lead management system built with the MERN stack

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC)](https://tailwindcss.com/)

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend Application** | [https://dutta-smart-leads.netlify.app](https://dutta-smart-leads.netlify.app) |
| **Backend API** | [https://smart-leads-53ls.onrender.com](https://smart-leads-53ls.onrender.com) |
| **GitHub Repository** | [https://github.com/Dutta-Raj/Smart_leads-](https://github.com/Dutta-Raj/Smart_leads-) |

### Test Credentials
Admin User:
Email: raj104@gmail.com
Password: Admin@123

## 📸 Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Registration Page
![Registration Page](./screenshots/register.png)

### Dashboard - Light Mode
![Dashboard Light](./screenshots/dashboard-light.png)

### Dashboard - Dark Mode
![Dashboard Dark](./screenshots/dashboard-dark.png)

### Create Lead Modal
![Create Lead](./screenshots/create-lead.png)

### Filters & Search
![Filters & Search](./screenshots/filters.png)

### Admin Panel
![Admin Panel](./screenshots/admin-panel.png)

### CSV Export
![CSV Export](./screenshots/csv-export.png)


text

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Role-Based Access Control](#-role-based-access-control)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)

## ✨ Features

### 🔐 Authentication System
- ✅ JWT-based authentication with token expiration
- ✅ User registration & login
- ✅ Password hashing using bcrypt (10 rounds)
- ✅ Protected routes with auth middleware
- ✅ Role-Based Access Control (Admin/Sales)

### 📊 Lead Management (CRUD)
- ✅ Create leads with name, email, status, source
- ✅ Read all leads in responsive table
- ✅ Update lead details
- ✅ Delete leads (admin only)
- **Lead Status:** New, Contacted, Qualified, Lost
- **Lead Sources:** Website, Instagram, Referral

### 🔍 Advanced Filtering & Search
- ✅ Filter by Status
- ✅ Filter by Source
- ✅ Debounced search by Name or Email (500ms)
- ✅ Sort by Latest/Oldest
- ✅ Multiple filters work together

### 📄 Pagination
- ✅ Backend pagination with skip/limit
- ✅ 10 records per page
- ✅ Pagination metadata (total, page, totalPages)

### 🎨 Frontend UI/UX
- ✅ Responsive design with TailwindCSS
- ✅ Reusable React components
- ✅ Loading & empty states
- ✅ Error handling UI
- ✅ Form validation with Zod
- ✅ Dark/Light mode toggle
- ✅ 2D animations with Framer Motion

### 📤 Additional Features
- ✅ CSV Export functionality
- ✅ Role-Based Access Control
- ✅ Docker ready configuration
- ✅ Dark mode support

### 👥 Admin Panel
- ✅ View all registered users
- ✅ Change user roles (Admin ↔ Sales)
- ✅ Delete users with cascade delete
- ✅ Protected from self-deletion

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.2.2 | Type safety |
| Vite | 5.0.0 | Build tool |
| TailwindCSS | 3.4.0 | Styling |
| Framer Motion | 10.16.0 | Animations |
| React Router DOM | 6.20.0 | Navigation |
| React Hook Form | 7.48.0 | Form handling |
| Zod | 3.22.0 | Validation |
| Axios | 1.6.0 | API calls |
| Lucide React | 0.303.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 4.18.2 | Web framework |
| MongoDB | 6.0+ | Database |
| Mongoose | 8.0.0 | ODM |
| JWT | 9.0.2 | Authentication |
| Bcryptjs | 2.4.3 | Password hashing |
| CORS | 2.8.5 | Cross-origin requests |

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ Client Browser │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ React SPA (Port 5173 / Netlify) │ │
│ │ • TailwindCSS for styling │ │
│ │ • Framer Motion for animations │ │
│ │ • Context API for state management │ │
│ └─────────────────┬───────────────────────────────────┘ │
└────────────────────┼───────────────────────────────────────┘
│ HTTPS / REST API
▼
┌─────────────────────────────────────────────────────────────┐
│ Express Server (Port 10000 / Render) │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ • JWT Authentication Middleware │ │
│ │ • Role-Based Access Control │ │
│ │ • Request Validation │ │
│ │ • Error Handling │ │
│ └─────────────────┬───────────────────────────────────┘ │
└────────────────────┼───────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ MongoDB Atlas │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ • users collection (authentication & roles) │ │
│ │ • leads collection (lead management) │ │
│ │ • Indexes for performance │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

text

## 💻 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn package manager
- Git

### Clone the Repository
```bash
git clone https://github.com/Dutta-Raj/Smart_leads-.git
cd Smart_leads-
Backend Setup
bash
cd backend
npm install
npm run dev
Frontend Setup
bash
cd frontend
npm install
npm run dev
🔧 Environment Variables
Backend .env file
env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_leads

# JWT Configuration
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Security
BCRYPT_ROUNDS=10

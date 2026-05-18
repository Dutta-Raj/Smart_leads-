cd C:\Users\KIIT\Desktop\smart-leads-dashboard

# Create comprehensive README.md
@'
# 🚀 Smart Leads Dashboard

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)

A **production-ready** full-stack lead management system built with the MERN stack (MongoDB, Express.js, React, Node.js). Features JWT authentication, role-based access control, real-time lead management, and an intuitive dashboard.

## 📸 Screenshots

| Login Page | Dashboard | Admin Panel |
|------------|-----------|-------------|
| ![Login](https://via.placeholder.com/400x250?text=Login+Page) | ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard) | ![Admin](https://via.placeholder.com/400x250?text=Admin+Panel) |

## ✨ Live Demo

> **Backend API:** `http://localhost:5000`  
> **Frontend App:** `http://localhost:5173`

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Role-Based Access](#-role-based-access)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Features

### 🔐 Authentication & Security
- JWT-based authentication with token expiration
- Password hashing using bcrypt (10 rounds)
- Protected routes with middleware
- Role-based access control (Admin/Sales)
- Session management with localStorage
- Input validation and sanitization

### 📊 Lead Management
- **Full CRUD operations** - Create, Read, Update, Delete leads
- **Rich lead fields**: Name, Email, Status, Source, Timestamps
- **Status tracking**: New → Contacted → Qualified → Lost
- **Source tracking**: Website, Instagram, Referral
- **Real-time updates** with auto-refresh

### 🔍 Advanced Filtering & Search
- **Multi-filter support**: Combine status and source filters
- **Debounced search** (500ms delay) for name/email
- **Sorting options**: Latest first / Oldest first
- **Backend pagination**: 10 records per page with metadata
- **Empty states** and loading skeletons

### 🎨 Modern UI/UX
- **Responsive design** - Works on desktop, tablet, and mobile
- **Dark/Light mode** with system preference detection
- **Smooth 2D animations** using Framer Motion
- **Glass morphism effects** and gradient backgrounds
- **Loading states** and error boundaries
- **Toast notifications** for user actions

### 📤 Export & Reporting
- **CSV export** with current filters applied
- Download leads data for external analysis
- Compatible with Excel, Google Sheets, and data tools

### 👥 Admin Panel
- **User management dashboard**
- Change user roles (Admin ↔ Sales)
- Delete users with cascade delete (removes their leads)
- Protected from self-deletion
- Real-time user list refresh

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

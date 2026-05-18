# API Documentation - Smart Leads Dashboard

## Base URL
- **Production:** https://smart-leads-53ls.onrender.com/api
- **Local:** http://localhost:5000/api

## Authentication Endpoints

### POST /api/auth/register
Register a new user

**Request Body:**
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "sales"
}

**Response:**
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "sales",
    "token": "jwt_token"
  }
}

### POST /api/auth/login
Login existing user

**Request Body:**
{
  "email": "john@example.com",
  "password": "password123"
}

**Response:**
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "sales",
    "token": "jwt_token"
  }
}

## Lead Management Endpoints

### GET /api/leads
Get all leads with pagination

**Headers:** Authorization: Bearer <token>

**Query Parameters:**
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- status: New, Contacted, Qualified, Lost
- source: Website, Instagram, Referral
- search: Search by name or email
- sort: latest or oldest

### POST /api/leads
Create a new lead

**Headers:** Authorization: Bearer <token>

**Request Body:**
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website"
}

### PUT /api/leads/:id
Update a lead

**Headers:** Authorization: Bearer <token>

### DELETE /api/leads/:id
Delete a lead (Admin only)

**Headers:** Authorization: Bearer <token>

### GET /api/leads/export/csv
Export leads to CSV

**Headers:** Authorization: Bearer <token>

## Admin Endpoints

### GET /api/admin/users
Get all users (Admin only)

### PUT /api/admin/users/:id/role
Change user role (Admin only)

### DELETE /api/admin/users/:id
Delete user (Admin only)

## Error Response
{
  "success": false,
  "error": "Error message"
}

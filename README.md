# VendorHub 🏢

> A comprehensive **Vendor Quotation Management System** for streamlining vendor management and quotation comparison in procurement workflows.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-14+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)
![Deployed](https://img.shields.io/badge/Status-Live-success)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Challenges & Solutions](#challenges--solutions)
- [Learning Outcomes](#learning-outcomes)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## 🎯 Overview

**VendorHub** is a full-stack web application designed to simplify vendor management and quotation comparison for procurement teams. Organizations can efficiently manage their vendor database, receive quotations, compare prices, and identify the best procurement options.

### Problem Solved
- ❌ Manual vendor management is time-consuming
- ❌ Comparing multiple quotations is error-prone
- ❌ Tracking procurement activities is difficult
- ❌ No centralized system for quotation analysis

### Solution
✅ Automated vendor and quotation management  
✅ Real-time price comparison with vendor ranking  
✅ Visual analytics and procurement insights  
✅ Centralized dashboard for procurement teams  

**Project Type:** Full Stack Development Internship Task (Teyzix Core - Task FS-2)

---

## ⭐ Key Features

### 📊 Interactive Dashboard
- Real-time statistics (Total Vendors, Active Quotations, Pending, Approved)
- Recent activities feed with timestamps
- Quick access to recent vendors
- Visual overview of procurement status

### 👥 Vendor Management
- **Add Vendors** with comprehensive details (name, company, email, contact, address)
- **Edit Vendor Information** with real-time updates
- **Delete Vendors** with confirmation
- **Search Vendors** by name, company, or email
- **Filter Vendors** by status (Active/Inactive)
- Form validation with real-time error feedback
- Vendor status tracking (Active/Inactive)

### 📋 Quotation Management
- **Create Quotations** with item details and pricing
- **Edit Quotations** to update pricing and status
- **Delete Quotations** with proper confirmation
- **Update Status** (Active/Pending/Approved)
- **Search Quotations** by title, description, or request group
- **Filter by Status** for quick access to relevant quotations
- Date tracking for all quotations
- Request group categorization

### 🔄 Quotation Comparison Engine
- **Compare Quotations** by request group
- **Highlight Lowest Quote** with visual indicators
- **Highlight Highest Quote** for price awareness
- **Vendor Ranking** based on quoted price
- **Calculate Potential Savings** vs most expensive option
- **Comparison Summary** with key metrics
- Sortable results (price, vendor, date)

### 📈 Analytics & Insights
- Total vendor count tracking
- Active quotation monitoring
- Status-based quotation breakdown
- Procurement activity timeline
- Price comparison insights
- Vendor performance tracking

### 🔒 Data Integrity
- Input validation on all forms
- MongoDB integration for persistent storage
- CRUD operations with proper error handling
- Status management for quotations
- Vendor lifecycle tracking

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | 18.2+ |
| **JavaScript (ES6+)** | Logic & Interactivity | - |
| **CSS3** | Styling & Layout | - |
| **Axios** | HTTP Client | 1.3+ |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime Environment | 14+ |
| **Express.js** | Web Framework | 4.18+ |
| **MongoDB Atlas** | Cloud Database | - |
| **Mongoose** | ODM | 7.0+ |

### DevOps & Deployment
| Platform | Purpose |
|----------|---------|
| **Vercel** | Frontend Hosting |
| **Render** | Backend Hosting |
| **GitHub** | Version Control |
| **MongoDB Atlas** | Database Hosting |

### Development Tools
- Git & GitHub for version control
- VS Code for development
- Postman for API testing
- MongoDB Compass for database management

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React)                        │
│  - Dashboard | Vendors | Quotations | Compare            │
└────────────────────┬────────────────────────────────────┘
                     │ (HTTPS)
                     ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Vendor API   │  │ Quotation    │  │ Dashboard    │   │
│  │ - CRUD ops   │  │ API - CRUD   │  │ API - Stats  │   │
│  │ - Validation │  │ - Comparison │  │ - Analytics  │   │
│  │ - Search     │  │ - Status Mgmt│  │ - Timeline   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                         │                                 │
│                    Middleware Layer                      │
│              (Validation, Error Handling)                │
└────────────────────────┬────────────────────────────────┘
                         │ (MongoDB Protocol)
                         ▼
┌─────────────────────────────────────────────────────────┐
│         DATABASE (MongoDB Atlas - Cloud)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Vendors      │  │ Quotations   │  │ Activities   │   │
│  │ Collection   │  │ Collection   │  │ Collection   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action (Create Vendor)
        ↓
React Component State Update
        ↓
API Call (POST /api/vendors)
        ↓
Express Middleware (Validation)
        ↓
Database Insertion (MongoDB)
        ↓
Response to Frontend
        ↓
UI Update with New Vendor
```

---

## 📁 Project Structure

```
vendorhub-quotation-management-system/
│
├── client/                              # Frontend (React)
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx           # Main dashboard
│   │   │   ├── Vendors.jsx             # Vendor management
│   │   │   ├── Quotations.jsx          # Quotation listing
│   │   │   ├── AddVendor.jsx           # Vendor form
│   │   │   ├── EditVendor.jsx          # Edit vendor modal
│   │   │   ├── AddQuotation.jsx        # Quotation form
│   │   │   ├── CompareQuotations.jsx   # Comparison engine
│   │   │   └── Navbar.jsx              # Navigation
│   │   ├── App.jsx                     # Main app component
│   │   ├── App.css                     # Global styles
│   │   └── index.js                    # Entry point
│   ├── package.json
│   └── .env.local
│
├── server/                              # Backend (Express)
│   ├── models/
│   │   ├── Vendor.js                   # Vendor schema
│   │   ├── Quotation.js                # Quotation schema
│   │   └── Activity.js                 # Activity log schema
│   ├── routes/
│   │   ├── vendors.js                  # Vendor endpoints
│   │   ├── quotations.js               # Quotation endpoints
│   │   └── dashboard.js                # Dashboard analytics
│   ├── middleware/
│   │   ├── validation.js               # Input validation
│   │   └── errorHandler.js             # Error handling
│   ├── config/
│   │   └── database.js                 # MongoDB connection
│   ├── server.js                       # Express server
│   ├── package.json
│   └── .env
│
├── README.md                            # Documentation
├── .gitignore
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**
- MongoDB Atlas account (free tier available)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Uzairkahn/vendorhub-quotation-management-system.git
cd vendorhub-quotation-management-system
```

#### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vendorhub
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm start
```

Server will run on `http://localhost:5000`

#### 3. Frontend Setup

In a new terminal, navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React development server:

```bash
npm start
```

Application will open at `http://localhost:3000`

### Verify Installation

1. Open `http://localhost:3000` in your browser
2. Navigate to Dashboard - should see empty state
3. Add a Vendor - form should validate
4. Add a Quotation - linked to vendor
5. Go to Compare - select request group and compare

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://vendorhub-quotation-management-system.onrender.com/api
```

### Vendor Endpoints

#### Get All Vendors
```http
GET /api/vendors
```

**Response:**
```json
{
  "success": true,
  "vendors": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "ABC Traders",
      "company": "ABC Technologies",
      "email": "contact@abc.com",
      "contact": "03001234567",
      "address": "Karachi, Pakistan",
      "status": "Active",
      "createdAt": "2026-06-30T10:30:00Z"
    }
  ]
}
```

#### Create Vendor
```http
POST /api/vendors
Content-Type: application/json

{
  "name": "ABC Traders",
  "company": "ABC Technologies",
  "email": "contact@abc.com",
  "contact": "03001234567",
  "address": "Karachi, Pakistan",
  "status": "Active"
}
```

#### Update Vendor
```http
PUT /api/vendors/:id
Content-Type: application/json

{
  "name": "ABC Traders Updated",
  "status": "Active"
}
```

#### Delete Vendor
```http
DELETE /api/vendors/:id
```

#### Search/Filter Vendors
```http
GET /api/vendors?search=ABC&status=Active
```

---

### Quotation Endpoints

#### Get All Quotations
```http
GET /api/quotations
```

#### Create Quotation
```http
POST /api/quotations
Content-Type: application/json

{
  "title": "Dell Laptops",
  "description": "Need 50 Dell laptops",
  "vendorId": "507f1f77bcf86cd799439011",
  "amount": 279.89,
  "group": "Office Supplies",
  "status": "Active"
}
```

#### Update Quotation Status
```http
PATCH /api/quotations/:id/status
Content-Type: application/json

{
  "status": "Approved"
}
```

#### Delete Quotation
```http
DELETE /api/quotations/:id
```

---

### Dashboard Endpoints

#### Get Dashboard Statistics
```http
GET /api/dashboard/stats
```

**Response:**
```json
{
  "totalVendors": 3,
  "activeQuotations": 2,
  "pendingQuotations": 0,
  "approvedQuotations": 1,
  "recentActivities": [...],
  "recentVendors": [...]
}
```

#### Compare Quotations
```http
POST /api/quotations/compare
Content-Type: application/json

{
  "group": "Office Supplies"
}
```

**Response:**
```json
{
  "group": "Office Supplies",
  "quotations": [...],
  "lowestQuote": 279.89,
  "highestQuote": 400.00,
  "potentialSavings": 120.11,
  "vendorRanking": [...]
}
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vendorhub

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### Production Environment

```env
# Backend (Render)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vendorhub
NODE_ENV=production
CLIENT_URL=https://vendorhub-quotation-management-syst.vercel.app

# Frontend (Vercel)
REACT_APP_API_URL=https://vendorhub-quotation-management-system.onrender.com/api
```

---

## 📱 Usage Guide

### 1. Dashboard Overview

![Dashboard](./screenshots/Dashboard.png)

**Features:**
- View total vendors count
- Monitor active quotations
- Track pending approvals
- See approved quotations
- Recent activity timeline
- Quick access to recent vendors

**Actions:**
- Click "New Quotation" to create a quotation
- View all vendors by clicking "Manage →"

---

### 2. Vendor Management

#### Adding a Vendor

![Vendor Form Validation](./screenshots/validationDuring_adding_vendor.png)

1. Navigate to **Vendors** section
2. Click **"+ Add Vendor"** button
3. Fill in vendor details:
   - Vendor Name (required)
   - Company Name (required)
   - Email Address (valid email required)
   - Contact Number (required)
   - Business Address (required)
   - Status (Active/Inactive)
4. Form validates in real-time
5. Click **"Add Vendor"** to save

**Validation Rules:**
- All fields are required
- Email must be valid format
- Contact number must be numeric
- Company and vendor name cannot be empty

#### Vendor List View

![Vendors Table](./screenshots/VendorDashboard.png)

Shows all vendors with:
- Vendor initials avatar
- Name and company
- Email and contact
- Business address
- Status badge
- Added date
- Edit/Delete actions

#### Searching Vendors

![Vendor Search](./screenshots/validation_searchingvendor.png)

- Search by vendor name, company, or email
- Filter by status (All statuses, Active, Inactive)
- Results update in real-time

---

### 3. Quotation Management

#### Creating a Quotation

![Add Quotation](./screenshots/QuotationAdded.png)

1. Navigate to **Quotations**
2. Click **"+ New Quotation"**
3. Fill quotation details:
   - Title (item name)
   - Description (requirements)
   - Select Vendor
   - Amount (quoted price)
   - Request Group (category)
   - Status (Active/Pending/Approved)
4. Submit form

#### Quotation List View

![Quotations List](./screenshots/searchquotation.png)

Shows all quotations with:
- Title and description
- Vendor name and email
- Quoted amount
- Request group/category
- Date added
- Current status
- Edit and Delete actions

#### Searching Quotations

Search by:
- Title (item name)
- Description (requirements)
- Request group (category)
- Status filter dropdown

---

### 4. Quotation Comparison

#### How to Compare

![Quotation Comparison](./screenshots/compare_quotation.png)

1. Navigate to **Compare** section
2. Select a **Request Group** from dropdown
3. Click **"Compare"** button
4. View comparison results showing:

**Comparison Metrics:**
- **Vendors Compared:** Total count
- **Lowest Quote:** Best price option (highlighted in green)
- **Highest Quote:** Most expensive option (highlighted in red)
- **Potential Savings:** Difference between lowest and highest

**Vendor Ranking Table:**
- Rank (#1 = Best Price)
- Vendor name and email
- Quoted amount
- Price difference vs best
- Quote date
- Status badge

---

## 📸 Screenshots

### Dashboard

![Dashboard Overview](./screenshots/Dashboard.png)

*Interactive dashboard with real-time statistics and activity feed*

---

### Vendor Management

#### Vendor Registration Form with Validation

![Add Vendor Form](./screenshots/validationDuring_adding_vendor.png)

*Form validation showing real-time error messages*

---

#### Vendor Search & Validation

![Search Vendors](./screenshots/validation_searchingvendor.png)

*Search functionality with empty state message*

---

#### Vendor Directory

![Vendors Table](./screenshots/VendorDashboard.png)

*Complete vendor list with actions (Edit/Delete)*

---

### Quotation Management

#### Add Quotation

![Add Quotation](./screenshots/QuotationAdded.png)

*Quotation creation confirmation*

---

#### Quotations List with Search

![Quotations Page](./screenshots/searchquotation.png)

*All quotations with search and status filter*

---

### Quotation Comparison

#### Compare Interface

![Compare Quotations](./screenshots/compare_quotation.png)

*Visual comparison with vendor ranking and savings calculation*

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

**Live URL:** https://vendorhub-quotation-management-syst.vercel.app

#### Steps:
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables:
   ```
   REACT_APP_API_URL=https://vendorhub-quotation-management-system.onrender.com/api
   ```
4. Deploy from main branch

### Backend Deployment (Render)

**Live URL:** https://vendorhub-quotation-management-system.onrender.com

#### Steps:
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Set environment variables:
   ```
   MONGODB_URI=mongodb+srv://...
   NODE_ENV=production
   CLIENT_URL=https://vendorhub-quotation-management-syst.vercel.app
   ```
5. Deploy

### Database (MongoDB Atlas)

1. Create free cluster on MongoDB Atlas
2. Create user and database
3. Whitelist IP addresses
4. Get connection string
5. Use in MONGODB_URI environment variable

---

## 🔧 Challenges & Solutions

### Challenge 1: Real-time Form Validation
**Problem:** Frontend and backend validation inconsistency

**Solution:**
- Implemented regex patterns for email validation
- Used Mongoose schema validation
- Added real-time error messages on form
- Server returns structured error responses

### Challenge 2: Quotation Comparison Logic
**Problem:** Comparing multiple quotations and ranking vendors

**Solution:**
- Backend filtering by request group
- Implemented sorting algorithm for price ranking
- Calculated potential savings dynamically
- Highlighted best and worst prices on frontend

### Challenge 3: State Management in React
**Problem:** Managing complex state across components

**Solution:**
- Used React hooks (useState, useEffect)
- Implemented proper component re-renders
- Centralized API calls in custom hooks
- Proper dependency arrays in useEffect

### Challenge 4: MongoDB Relationships
**Problem:** Linking vendors with quotations

**Solution:**
- Used MongoDB ObjectId references
- Implemented population in backend queries
- Proper validation before creating quotations
- Cascade delete handling for vendor removal

### Challenge 5: CORS and API Integration
**Problem:** Frontend-backend communication across different domains

**Solution:**
- Configured CORS middleware in Express
- Set proper headers for all responses
- Handled preflight requests
- Implemented proper error handling in Axios

---

## 📚 Learning Outcomes

### Full-Stack Development Concepts

#### Frontend Development
- ✅ React component architecture and lifecycle
- ✅ State management with hooks (useState, useEffect)
- ✅ Conditional rendering and list rendering
- ✅ Form handling and validation
- ✅ API integration with Axios
- ✅ CSS styling and responsive design
- ✅ Component composition and reusability

#### Backend Development
- ✅ Express.js server setup and routing
- ✅ RESTful API design principles
- ✅ Request/response handling
- ✅ Middleware implementation
- ✅ Error handling and validation
- ✅ CORS configuration
- ✅ Environment variable management

#### Database Design
- ✅ MongoDB document structure and collections
- ✅ Mongoose schema design and validation
- ✅ Data relationships and references
- ✅ Query optimization
- ✅ Indexing for performance
- ✅ Aggregation pipelines

#### DevOps & Deployment
- ✅ Git and GitHub version control
- ✅ Frontend deployment with Vercel
- ✅ Backend deployment with Render
- ✅ Environment configuration management
- ✅ Cloud database setup (MongoDB Atlas)
- ✅ CI/CD concepts

#### Software Engineering Practices
- ✅ Clean code principles
- ✅ Project structure and organization
- ✅ API documentation
- ✅ Error handling best practices
- ✅ User input validation
- ✅ Security considerations
- ✅ Testing and debugging

---

## 🚀 Future Improvements

### Phase 1: Core Features
- [ ] **User Authentication** - Login/signup with JWT
- [ ] **Role-Based Access Control** - Admin/User/Vendor roles
- [ ] **Email Notifications** - Quotation updates via email
- [ ] **PDF Export** - Generate quotation PDFs

### Phase 2: Analytics & Reporting
- [ ] **Advanced Charts** - Price trends and vendor performance
- [ ] **Analytics Dashboard** - Procurement insights
- [ ] **Vendor Ratings** - User feedback and ratings
- [ ] **Report Generation** - Automated procurement reports

### Phase 3: Enhanced Features
- [ ] **Dark Mode** - Theme toggle
- [ ] **Pagination** - Handle large datasets
- [ ] **Advanced Search** - Multi-criteria filtering
- [ ] **Bulk Operations** - Import/export vendors and quotations
- [ ] **Audit Trail** - Track all changes
- [ ] **Notifications** - In-app and email alerts

### Phase 4: Optimization
- [ ] **Performance Optimization** - Caching and lazy loading
- [ ] **Mobile Responsive** - Improved mobile experience
- [ ] **Load Testing** - Handle high traffic
- [ ] **Security Audit** - Penetration testing

---

## 📞 Author

**Uzair Khan**  
Full-Stack Developer | AI/ML Engineer

- **Email**: [uzairkhan4645632@gmail.com](mailto:uzairkhan4645632@gmail.com)
- **GitHub**: [@Uzairkahn](https://github.com/Uzairkahn)
- **LinkedIn**: [uzair-khan-616048385](https://www.linkedin.com/in/uzair-khan-616048385/)
- **Portfolio**: [github.com/Uzairkahn](https://github.com/Uzairkahn)

---

## 📄 License

This project is open source and available under the **MIT License**.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Teyziz Core** for the internship opportunity
- **Express.js & React** communities for excellent documentation
- **MongoDB Atlas** for free tier database hosting
- **Vercel & Render** for seamless deployment

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Repository** | [GitHub Link](https://github.com/Uzairkahn/vendorhub-quotation-management-system) |
| **Frontend URL** | [Vercel Deployment](https://vendorhub-quotation-management-syst.vercel.app) |
| **Backend URL** | [Render Deployment](https://vendorhub-quotation-management-system.onrender.com) |
| **Total Components** | 8+ React Components |
| **API Endpoints** | 15+ REST endpoints |
| **Database Collections** | 3 (Vendors, Quotations, Activities) |
| **Code Quality** | Production-Ready |

---

## 🔗 Quick Links

- **📝 Documentation**: See README.md
- **🐛 Report Issues**: GitHub Issues
- **💬 Discussions**: GitHub Discussions
- **📧 Contact**: uzairkhan4645632@gmail.com

---

<div align="center">

### ⭐ If this project was helpful, please give it a star!

**Built with ❤️ during Full-Stack Internship**

*VendorHub - Simplifying Vendor Management Since 2026*

</div>

---

**Last Updated:** June 30, 2026  
**Version:** 1.0.0  
**Status:** 🟢 Production Ready
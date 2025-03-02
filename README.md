# 📝 Product Feedback Submission and Listing App

## 🚀 Overview
This is a Full-Stack web application where users can submit product feedback, view submitted feedback, and sign up/login for authentication.

The project is built using React (Frontend), Redux Toolkit (State Management), Node.js/Express (Backend), and MongoDB/PostgreSQL (Database).

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose) 
- JSON Web Token (JWT) for authentication
- bcrypt for password hashing
- CORS, dotenv, and other necessary middleware

### Deployment 
- **Frontend:** Vercel
- **Backend:** Render/Fly.io

## 📌 Features
- ✅ User Authentication (Signup/Login using JWT)
- ✅ Submit Product Feedback (Title, Description, User Name)
- ✅ View Submitted Feedback Entries
- ✅ State Management using Redux Toolkit
- ✅ Secure API with Authentication
- ✅ Proper Error Handling & Validation

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/product-feedback-app.git  
cd product-feedback-app  
```

### 2️⃣ Backend Setup (Node.js + Express)
Navigate to the backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the backend folder and add:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string  # If using MongoDB
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm start  
```
Backend should run on `http://localhost:3000`.

### 3️⃣ Frontend Setup (React + Redux)
Navigate to the frontend folder:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the frontend:
```bash
npm start
```
The app should be available at `http://localhost:5173`.

## 📡 API Endpoints
| Method | Endpoint       | Description                | Authentication Required |
|--------|---------------|----------------------------|-------------------------|
| POST   | `/auth/signup` | Register a new user       | ❌ No |
| POST   | `/auth/login`  | Login user & get JWT token | ❌ No |
| POST   | `/feedback`    | Submit new feedback       | ✅ Yes |
| GET    | `/feedback`    | Get all submitted feedback | ✅ Yes |

## 🔄 Feedback Submission Flow

### 1️⃣ User Authentication
- If a user is not logged in, they must sign up or log in before submitting feedback.
- The user logs in and receives a JWT token, stored in local storage.

### 2️⃣ Submit Feedback
- The user fills in the feedback form:
  - **Title**: Short description of the feedback
  - **Description**: Detailed feedback
  - **User Name (Optional)**
- The form data is sent to `POST /feedback` along with the JWT token.
- The server validates the request and stores feedback in the database.

### 3️⃣ Display Feedback
- On page load, the frontend makes a request to `GET /feedback` with the user's JWT token.
- The backend responds with a list of all feedback entries.
- The frontend displays the feedback list dynamically.

## 🔐 Authentication Flow

### **User Signup (`/auth/signup`):**
1. User provides name, email, and password.
2. Password is hashed using bcrypt.
3. A JWT token is issued upon successful registration.

### **User Login (`/auth/login`):**
1. User logs in with email & password.
2. Server verifies credentials and returns a JWT token.

### **Protected Routes (`/feedback`):**
- Users must provide a valid JWT token in the request header (`Authorization: Bearer token`).
- The server verifies the token before allowing access.

## 🚀 Deployment 
- **Frontend:** https://customer-feedback-system-rej5wn3bs-sujata-randhayes-projects.vercel.app
- **Backend:** https://customer-feedback-system-4.onrender.com

## 🔥 Challenges Faced & Solutions
- **JWT Authentication:** Used middleware to protect routes and verify tokens.
- **State Management:** Implemented Redux Toolkit for smoother data handling.
- **CORS Issues:** Enabled CORS in the backend (`cors` package).
- **Password Security:** Used bcrypt for hashing and secure storage.
- **Handling Protected Routes:** Used React Router to redirect unauthorized users to the login page.

## 🤝 Contributing
Feel free to fork this repository, raise issues, and submit pull requests.


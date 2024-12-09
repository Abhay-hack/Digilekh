# Digilekh

## Overview
Digilekh is a web application designed to manage [describe your project's purpose briefly].

---

## Dependencies

### 1. Backend
To set up the backend, you need to install the following dependencies:

- **Languages and Frameworks:**
  - Node.js (runtime environment)
  - Express.js (web framework)

- **Database:**
  - MongoDB (or your chosen database)

- **Others:**
  - Any backend-specific packages listed in `package.json`.

#### Steps to Install Backend Dependencies:
1. Navigate to the `backend` directory:
   ```sh
   cd backend
2. Install Dependencies
   ```sh
   npm i
   npm install express
   npm install jsonwebtoken
   npm install multer mongoose socket.io dotenv cors body-parser cookie-parser
3. If not already installed, consider adding these development utilities:
   ``sh
   npm install nodemon --save-dev

3. Create a `.env` file
   ```sh
   PORT=your-port-number
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret

## Backend Folder Structure:
   ```sh
   project/
   ├── middleware/
   │   ├── multer.js         // Custom multer configuration
   │   └── auth.js           // Authentication middleware
   ├── models/
   │   ├── blog.js
   │   ├── comment.js
   │   ├── community.js
   │   └── user.js
   ├── socket.js              // Socket implementation
   ├── routes/
   │   ├── blogRouter.js
   │   ├── communityRouter.js
   │   └── userRouter.js
   ├── uploads/               // Directory for uploaded files
   ├── index.js
   ├── .env                   // Environment variables
   └── package.json


### 2. Frontend
To set up the backend, you need to install the following dependencies:

- **Languages and Frameworks:**
  - React.js

#### Steps to Install Backend Dependencies:
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
2. Install Dependencies
   ```sh
   npm i
  

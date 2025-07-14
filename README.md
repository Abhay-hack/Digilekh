# ✨ Digilekh

**Digilekh** is a full-stack web application designed to manage and share blogs and discussions within an interactive community. It empowers users to post content, comment on discussions, and join topic-based communities, all within a modern and intuitive interface.

---

## 🔍 Project Overview

Digilekh is a blogging and community discussion platform where users can:
- Create and publish blog posts
- Join or create topic-specific communities
- Comment and engage with others in real time using Socket.IO
- Authenticate and manage their profiles securely using JWT

It features a responsive frontend built with **React.js**, and a powerful backend powered by **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 Features

- 📝 Blog creation and editing  
- 💬 Comment system with real-time updates  
- 🧑‍🤝‍🧑 Community creation and participation  
- 🔐 Secure user authentication (JWT)  
- 📁 Image/file uploads using Multer  
- 🌐 REST API integration with Axios  
- 🎨 Styled using Styled-Components and React Icons  
- ⚡ Real-time interaction using Socket.IO  

---

## 🚧 Getting Started

To set up this project locally, follow these instructions:

### 🖥️ 1. Backend Setup

#### 🔧 Tech Stack

- **Languages and Frameworks:**  
  Node.js, Express.js

- **Database:**  
  MongoDB

- **Other Dependencies:**  
  JSON Web Token, Multer, Socket.IO, Dotenv, CORS, Body-parser, Cookie-parser

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
   NODE_ENV=production

## 🗂️ Backend Folder Structure:
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

```
# How to run
  ```sh
  node index.js
```
  or
  ```sh
  nodemon index.js
```

### 🌐 2. Frontend Setup
 ##🔧 Tech Stack
  - **Languages and Frameworks:**  
        React.js
  - **Other Dependencies:**
       React Router DOM, Axios, Socket.IO Client, Styled Components, Moment, React Icons, Emoji Picker

#### Steps to Install Frontend Dependencies:
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
2. Install Dependencies
   ```sh
   npm i
   npm install react-router-dom axios socket.io-client styled-components moment
   npm i react-icons emoji-picker-react

# How to run
```sh
npm run dev

```

## 🗂️ Frontend Folder Structure
  ```sh
src/
├── components/
│   ├── Header.js
│   ├── Loader.js
│   ├── CommentSection.js
│   └── BlogPost.js
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Contact.js
│   ├── Signup.js
│   ├── Login.js
│   ├── Profile.js
│   ├── Blogs.js
│   ├── BlogDetail.js
│   ├── CommunityList.js
│   ├── CommunityDetail.js
│   └── CommunityCreate.js
├── assets/
│   └── user.png
├── axios/
│   ├── index.js           # Configure axios instances here
├── App.js
└── index.js

```
  
## 🎯 How to Use


## 👤 Author
This project was created by **Abhay Gupta**. Feel free to connect on [LinkedIn](https://www.linkedin.com/in/abhay-gupta-1257b6248/) or check out more projects on [GitHub](https://github.com/Abhay-hack/Lumina).

#✨ Digilekh

**Digilekh** is a web application designed to manage .


## 🔍 Project Overview


## 🚀 Features

---

## 🚧 Getting Started

To set up this project locally, follow these instructions:

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
   npm install react-router-dom axios socket.io-client styled-components moment

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

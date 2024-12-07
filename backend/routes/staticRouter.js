const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticate = require("../middleware/auth")


const {
    handleUserSignup,
    handleUserLogin,
    handleProfile,
    handleLogout,
} = require("../controller/user")

router.post('/signup', handleUserSignup)

router.post('/login', handleUserLogin);

router.get('/profile', authenticate, handleProfile);

router.post('/logout', handleLogout);

module.exports = router;

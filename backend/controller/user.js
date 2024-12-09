const User = require('../models/user');
const { createHmac } = require('crypto');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const Community = require('../models/Community')

const cookie  = require('cookie-parser')

async function handleUserSignup(req, res) {
    try {
        const { username, email, password } = req.body; // Use "username"
        console.log(req.body);

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const user = await User.create({
            fullname: username, // Map "username" to "fullname"
            email,
            password,
        });

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const hashPassword = createHmac('sha256', user.salt).update(password).digest('hex');

        if (hashPassword !== user.password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user._id }, 'Abhay',{});
        res.cookie('authToken', token, {
            httpOnly: true,  
            secure: false,   
            maxAge: 3600000, 
        });

        //jwt

        return res.status(200).json({ message: 'Login successful', token });

       


    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function handleProfile(req, res){
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).select('-password -salt');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const communities = await Community.find({ creator: userId })
            .populate('creator', 'fullname email');

        const blogs = await Blog.find({ author: userId }); 

        return res.status(200).json({
            user,
            blogs,
            communities,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleLogout(req, res){
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict',
        });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleProfile,
    handleLogout,
}

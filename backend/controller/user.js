const { randomBytes, createHmac } = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');
const Community = require('../models/Community');
const bcrypt = require('bcrypt'); // Preferred over bcryptjs

// User Signup
async function handleUserSignup(req, res) {
    try {
        const { username, email, password } = req.body;
        console.log('Signup Request Body:', req.body);

        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            fullname: username,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        // Log for debugging
        console.log('Stored in DB (hashed by middleware):', user.password);

        // Generate a JWT token for the new user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        return res.status(201).json({ message: 'User created successfully', user, token });
    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

<<<<<<< HEAD
        console.log('Login Request Body:', req.body);

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ error: 'Both email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
=======
        // Log email and password for debugging
        console.log('Login Attempt:', { email, password });

        if (!email || !password) {
            return res.status(400).json({ error: 'Both email and password are required' });
        }

        // Search for user by email
        const user = await User.findOne({ email });
>>>>>>> 564d154182067be0192440f8a59954d08b3e76e1
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

<<<<<<< HEAD
        // Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Sign JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
            expiresIn: '1h',
        });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 3600000, // 1 hour
        });

=======
        // Log the user object retrieved for debugging
        console.log('User Object Retrieved:', user);

        // Log the stored password and input password
        console.log("User's stored password:", user.password);
        console.log("Input password:", password);

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Log the result of the password comparison for debugging
        console.log('Password Comparison Result:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token upon successful login
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

>>>>>>> 564d154182067be0192440f8a59954d08b3e76e1
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login Error:', { error: error.message, stack: error.stack });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



async function handleProfile(req, res) {
    try {
        const userId = req.user?.userId;

<<<<<<< HEAD
        console.log('Fetching Profile for User ID:', userId);

        const user = await User.findById(userId).select('-password');
=======
        const user = await User.findById(userId).select('-password -salt');
>>>>>>> 564d154182067be0192440f8a59954d08b3e76e1
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

<<<<<<< HEAD
        const communities = await Community.find({ creator: userId }).populate('creator', 'fullname email');
        const blogs = await Blog.find({ author: userId });
=======
        const { page = 1, limit = 10 } = req.query;

        const communities = await Community.find({ creator: userId })
            .populate('creator', 'fullname email')
            .skip((page - 1) * limit)
            .limit(limit);

        const blogs = await Blog.find({ author: userId })
            .skip((page - 1) * limit)
            .limit(limit);
>>>>>>> 564d154182067be0192440f8a59954d08b3e76e1

        return res.status(200).json({ user, blogs, communities });
    } catch (error) {
        console.error('Profile Fetch Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function handleLogout(req, res) {
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
<<<<<<< HEAD
            secure: false, // Set to true in production
=======
            secure: process.env.NODE_ENV === 'production',
>>>>>>> 564d154182067be0192440f8a59954d08b3e76e1
            sameSite: 'strict',
        });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
    const token = req.cookies?.authToken;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleProfile,
    handleLogout,
    authenticateToken,
};

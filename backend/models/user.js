const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/images/avatar.jpg",
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER",
    },
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString('hex');
    const hashPassword = createHmac('sha256', salt).update(user.password).digest("hex");

    user.salt = salt;
    user.password = hashPassword;

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

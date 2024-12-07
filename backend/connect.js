const mongoose = require('mongoose');

async function connectDb(user){
    return mongoose.connect(user);
}

module.exports = {
    connectDb,
}
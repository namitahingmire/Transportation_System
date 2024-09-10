const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
const mongoose = require('mongoose');

const User = mongoose.model('User',{

    name: {
        type: 'string',
        required: true
    },
    lastname: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
});

module.exports = User;
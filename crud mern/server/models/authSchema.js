const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        require: true
    },
},
    {
        timestamps: true
    })

const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;

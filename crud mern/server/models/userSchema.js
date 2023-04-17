const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    passowrd: {
        type: String,
        require: true
    }

})



const Users = mongoose.model("users", userSchema)
module.exports = Users;

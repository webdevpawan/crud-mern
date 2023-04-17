const express = require('express');
const mongoose = require("mongoose");

app = express();

const Users = require('./models/userSchema');
const cors = require('cors')
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const asyncHandler = require('express-async-handler');
const Auth = require('./models/authSchema');
const bcrypt = require('bcryptjs');
const generateToken = require('./middleware/tokenMiddleware');

mongoose.connect('mongodb://127.0.0.1:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log('Error connecting to database: ', error));

app.post("/add-user", async (req, res) => {
    try {
        const user = new Users({
            name: req.body.name,
            username: req.body.username,
            contact: req.body.contact,
            email: req.body.email,
            passowrd: req.body.password
        })

        await user.save()
        res.send({ status: 1, message: "User created successfully", data: user })

    } catch (error) {
        res.send({
            status: 0,
            message: `Can not create user ${error}`
        })
    }
})

app.get("/users", async (req, res) => {
    try {
        const usersData = await Users.find({});
        res.send({
            status: 1, message: "User find successfully", users: usersData
        })
    } catch (error) {
        console.log(error);
    }
})

app.get("/single-user/:id", async (req, res) => {
    try {
        const singleUser = await Users.find({
            _id: req.params.id
        })
        res.send({
            status: 1,
            message: "User found successfully",
            user: singleUser
        })
    } catch (error) {
        console.log(error);
    }
})


app.put("/update-user/:id", async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                username: req.body.username,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password
            }
        }, { new: true });

        res.send({
            status: 1,
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "An error occurred while updating the user" });
    }
});

app.delete("/delete-user/:id", async (req, res) => {
    try {
        const deletedUser = await Users.deleteOne({
            _id: req.params.id
        })
        res.send({
            status: 1,
            message: "user deleted successfully",
            deletedUser
        })

    } catch (error) {
        console.log(error);
    }
})

// Register api

app.post("/user/register", asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await Auth.findOne({ email });
        if (userExists) {
            res.send({
                status: 0,
                message: "User already exits"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Auth({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();
        const token = generateToken(newUser._id)
        if (newUser) {
            res.send({
                status: 1,
                message: "Register Successfully",
                data: { name, email, token }
            })
        }
        else {
            res.send({
                status: 0,
                message: "error occured"
            })
        }
    } catch (error) {

    }
}))


// Login api

app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
        res.send({ message: "User does not exists" })
    }
    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) {
        res.send({
            status: 400,
            message: "Password is incorrect"
        })
    } else {
        const token = generateToken(Auth._id)
        res.send({
            status: 200,
            message: "User logged in",
            token
        })
    }
})


app.listen("4000", () => {
    console.log("server running on port 4000 ");
})

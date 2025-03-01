const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//Registering a new user
const registerUser = async (req, res) => {
    try {
        const {name, email, mobileNumber, password, role, specialization, availableDays } = req.body;


        //tocheck if the registering user already exists in the records
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "This User already exists, If you think this is a mistake contant portal admin on email: admin@operations.com"});

        //if the user does not exist in the database, create a new user with the data provided
        const newUser = new User({
            name,
            email,
            mobileNumber,
            password,
            role,
            specialization: role === "doctor" ? specialization : null,
            availableDays: role === "doctor" ? availableDays: [],
        });

        //now saving and updating the newly created user to the database
        await newUser.save();

        res.status(201).json({ message: " User registered successfully "});
    } catch(err) {
        res.send(500).json({message: "Server Error, try again later", error: err.message});
    }
};

// now creating login for newly created users and existing users

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //finging the user byemail id
        const user = await User.findOne({ email });
        if (!user ) 
            return res.status(401).json({message: "Invalid Credentials: Check you email" });
        //comparingthe esisting passwd
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({message: "Invalid Credentials: Re-enter your password"});


        //if everything matches, then a jwt token is genetrated
        const token = jwt.sign(
            { userId: user._id, role: user.role},
            process.env.JWT_SECRET , { expiresIn: "1h"}
        );

        res.status(200).json({message: "Login Sucessful", token});
    } catch (error) {
        res.status(500).json({ message: "Server Error" , error: error.message });
    }
};

module.exports = { registerUser, loginUser };

const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (user) => {
    // console.log(process.env.SECRET_KEY);
    return jwt.sign({ user }, process.env.SECRET_KEY);  // secret key is required the passwor to decrypt
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        // checking for existing email
        if (user) {
            return res.status(200).send({ message: "Email already registered" });
        }
        // if new user, create it or allow to register
        user = await User.create(req.body);

        const token = generateToken(user);
        return res.status(200).send({ user, token });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}


const login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        // check if email exists
        if (!user) {
            return res.status(400).send("Wrond Email or Password");
        }
        // if email exists , check password
        const match = user.checkpassword(req.body.password);
        // if it doesn't match
        if (!match) {
            return res.status(400).send(({ message: "Wrong Email or Password" }))
        }
        //if it matches
        const token = generateToken(user);
        return res.status(200).send({ user, token });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}


module.exports = { register, login };
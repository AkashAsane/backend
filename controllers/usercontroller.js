const User = require("../models/user");
const bcrypt = require('bcrypt');
const generateToken=require('../services/tokenservice')


const createUser = async (req, res) => {
    try {
        const {email,password,username}= req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = new User({ email, username, password });
         
        const response = await newUser.save();

        const token=generateToken(response.username)

        res.status(201).json({ message: 'User created successfully', response:response,token:token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload)

        res.status(200).json({ message: 'User login successful', user: { id: user.id, name: user.username,token:token } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    loginUser
};
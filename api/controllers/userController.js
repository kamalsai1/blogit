const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "Please fill all the fields" });
        // throw new Error("Please fill all the fields");
    }
    const userAvailable = await User.findOne({ email:email });
    if (userAvailable) {
        res.status(400).json({ message: "User already Exists" });
        // throw new Error("User already Exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            username: username, email: email, password: hashPassword, name: "name"
        });
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json(error);
    }
})

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Please fill all the fields" });
        throw new Error('Please fill all the fields');
    }
    const user = await User.findOne({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                username: user.username,
                password: user.password,
                id: user._id,
            }
        }, process.env.JWT_SECRET, { expiresIn: "60m" });

        // res.setHeader('Set-Cookie', cookie.serialize('access_token', token, { httpOnly: true, secure: true, path: '/', expires: new Date(Date.now() + 900000)}));

         res.status(200).json({user:user,token:token});
    }
    else {
        res.status(404).json({message:"Invalid email address or password"});
    }
})

//@desc Get current logged in user
//@route GET /api/users/getCurrentUser
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

//@desc Get user from given id
//@route GET /api/users/getUserbyId/:id
//@access Private
const getUserbyId = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "No user found" });
        // throw new Error("No user found");
    }
    res.status(200).json(user);
});

//@desc logout current user
//@route POST /api/users/getUserbyId/:id
//@access Public
const logOutUser = asyncHandler(async (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('access_token', '', {httpOnly: true, secure: true, expires: new Date(Date.now()), path: '/' }))
    // res.clearCookie("access_token",{
    //     sameSite:'none',
    //     secure:'true'
    // })
    .status(200).json({message:"user logged Out"});
})

module.exports = { registerUser, loginUser, getCurrentUser,getUserbyId,logOutUser };
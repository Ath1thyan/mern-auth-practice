import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res, next) => {

// Get user data from request body
    const { username, email, password } = req.body;
// Password hashing
    const hashedPassword = bcryptjs.hashSync(password, 10);

// Create a new user object with hashed password and save it to the database
    const newUser = new User({ username, email, password: hashedPassword });

    try {
    // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(200, "User already exists"));
        }
    // Save user to the database
        await newUser.save();
        res.status(201).json({ message: "User added successfully!" });
    }
    catch (error) {
        next(error)
    }
};


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found."));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid user credentials."));
        }
        // Create and sign JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...restItems } = validUser._doc;
        // Set cookie with JWT token
        const expiryDuration = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, {httpOnly: true, expires: expiryDuration}).status(200).json(restItems);
    }
    catch (error) {
        next(error)
    }
}
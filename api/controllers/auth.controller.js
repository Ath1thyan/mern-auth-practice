import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {

// Get user data from request body
    const { username, email, password } = req.body;
// Password hashing
    const hashedPassword = bcryptjs.hashSync(password, 10);

// Create a new user object with hashed password and save it to the database
    const newUser = new User({ username, email, password: hashedPassword });

    try {
    // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });
    // Save user to the database
        await newUser.save();
        res.status(201).json({ message: "User added successfully!" });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
    
};
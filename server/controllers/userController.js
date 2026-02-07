import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}

// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Generate token
        const token = generateToken(newUser._id);
        newUser.password = undefined;
        return res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error: error.message });
    }
}


// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User Email Check
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        // Password Check
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        // Generate Token
        const token = generateToken(user._id);
        user.password = undefined;
        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error: error.message });
    }
}

// controller for getting user id 
// GET: /api/users/data

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;
        // check if user exist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // return user
        user.password = undefined;
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error: error.message });
    }
}

// controller for getting user resume
// GET: /api/users/resume


export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;
        // return resume
        const resumes = await Resume.find({ userId });
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
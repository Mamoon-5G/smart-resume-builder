import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate password length and complexity (optional)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user (password will be saved in plain text)
    user = new User({
      name,
      email,
      password, // Store plain text password here
    });

    // Save the user to the database
    await user.save();

    // Create the JWT payload
    const payload = {
      userId: user._id,
    };

    // Generate the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user info (if needed)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password (in this case, passwords are plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create the JWT payload
    const payload = {
      userId: user._id,
    };

    // Generate the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user info
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

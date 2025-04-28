import express from 'express';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config(); // Load .env file variables

const app = express();

app.use(cors());
// Middleware
app.use(express.json()); // To parse JSON data

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

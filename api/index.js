import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.log(err);
    })


const app = express();

app.use(express.json());

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});


// API middleware
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import commentRoutes from './Routes/CommentRoutes.js';
import fileUploadRouter from './Routes/UploadRoute.js';
import MessageRoutes from './Routes/MessageRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Serve static files
app.use('/api/upload', fileUploadRouter);
app.use('/images', express.static('public/images'));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  app.listen(process.env.SERVER_PORT, () =>
    console.log(`✅ Server listening at port ${process.env.SERVER_PORT}`)
  );
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// API Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/api/posts', PostRoute);
app.use('/upload', UploadRoute);
app.use('/api/posts', commentRoutes);
app.use('/api/messages', MessageRoutes);

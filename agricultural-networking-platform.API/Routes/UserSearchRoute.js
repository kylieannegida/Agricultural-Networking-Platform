import express from 'express';
import User from '../Models/userModel.js';

const router = express.Router();

// GET /api/users/search?query=someText
router.get('/search', async (req, res) => {
  const { query } = req.query;

  console.log('Incoming query:', query); // 🔍 See if this even prints

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { firstname: { $regex: query, $options: 'i' } },
        { lastname: { $regex: query, $options: 'i' } },
      ],
    }).limit(20);

    res.status(200).json(users);
  } catch (err) {
    console.error('Search error:', err); // 👈 This will print in your terminal
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


export default router;

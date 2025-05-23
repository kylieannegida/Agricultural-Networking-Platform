import express from "express";
import {
  UnFollowUser,
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleWare.js";
import User from "../Models/userModel.js"; // Import the User model

const router = express.Router();

// Existing routes
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, UnFollowUser);

// NEW: Search users by query parameter "query"
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // Case-insensitive partial match on username, firstname, or lastname
    const users = await User.find({
      $or: [
        // { username: { $regex: query, $options: "i" } },
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
      ],
    }).limit(20);

    res.status(200).json(users);
  } catch (error) {
    console.error('User search error:', error);
    res.status(500).json({ message: "Error searching users", error: error.message });
  }
});

export default router;

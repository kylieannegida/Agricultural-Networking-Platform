import postModel from '../Models/postModel.js';
import mongoose from 'mongoose';
import UserModel from "../Models/userModel.js";

// Create new post
export const createPost = async (req, res) => {
  const newPost = new postModel(req.body);
  console.log("Creating post with data:", req.body);

  try {
    const saved = await newPost.save();
    console.log("Post saved:", saved);
    res.status(200).json(saved);
  } catch (error) {
    console.error("Post creation failed:", error);
    res.status(500).json(error);
  }
};

// Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated Successfully!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted Successfully!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like/Dislike a post
export const like_dislike_Post = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked.");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Reshare a post
export const sharePost = async (req, res) => {
  const { userId, sharedPostId, desc } = req.body;

  try {
    const originalPost = await postModel.findById(sharedPostId);
    if (!originalPost) {
      return res.status(404).json({ message: "Original post not found" });
    }

    const resharedPost = new postModel({
      userId,
      desc: desc || "",          // Optional user comment on share
      sharedPostId: originalPost._id,
      // Add other fields if needed (e.g. image) here
    });

    const savedPost = await resharedPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error resharing post:", error);
    res.status(500).json({ message: "Reshare failed", error });
  }
};

// Get timeline posts with populated shared posts
// Get timeline posts with shared posts populated
export const timeline = async (req, res) => {
  const userId = req.params.id;

  try {
    // 1. Get the current user
    const currentUser = await UserModel.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Get current user's own posts
    const userPosts = await postModel
      .find({ userId })
      .populate({
        path: 'sharedPostId',
        populate: { path: 'userId', select: 'username' } // optional: get reshared post owner's name
      });

    // 3. Get posts from users the current user follows
    const followingPosts = await postModel
      .find({ userId: { $in: currentUser.following } })
      .populate({
        path: 'sharedPostId',
        populate: { path: 'userId', select: 'username' }
      });

    // 4. Combine and sort
    const allPosts = [...userPosts, ...followingPosts].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Timeline error:", error);
    res.status(500).json({ message: "Failed to fetch timeline posts" });
  }
};

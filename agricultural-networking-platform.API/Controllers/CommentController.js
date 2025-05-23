import Comment from "../Models/commentModel.js";

// Create a new comment
export const addComment = async (req, res) => {
  const { userId, text, firstname, lastname } = req.body;
  const { postId } = req.params;

  try {
    const name = `${firstname} ${lastname}`.trim();

    console.log("Adding comment:", { postId, userId, text, name });

    const newComment = new Comment({
      postId,
      userId,
      text,
      name,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error in addComment:", err);
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

// Get comments by post ID
export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};

import express from 'express';
import { addComment, getComments } from '../Controllers/CommentController.js';

const router = express.Router();

// Route to add a comment
router.post('/:postId/comments', addComment);

// Route to get all comments for a post
router.get('/:postId/comments', getComments);

export default router;

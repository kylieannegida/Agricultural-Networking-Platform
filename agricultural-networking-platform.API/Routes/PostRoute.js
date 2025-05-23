import express from 'express';
import { createPost, deletePost, getPost, like_dislike_Post, timeline, updatePost, sharePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like_dislike', like_dislike_Post);
router.post('/share', sharePost);
router.get('/:id/timeline', timeline);


export default router;
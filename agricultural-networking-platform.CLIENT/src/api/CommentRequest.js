import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

// Get all comments for a specific post
export const getComments = (postId) => API.get(`/api/posts/${postId}/comments`);
export const addComment = (postId, commentData) => API.post(`/api/posts/${postId}/comments`, commentData);



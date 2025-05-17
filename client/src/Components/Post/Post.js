import React, { useState, useEffect } from 'react';
import './Post.css';
import CommentIcon from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { getComments, addComment } from '../../api/CommentRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data?.likes?.includes(user._id) || false);
  const [likes, setLikes] = useState(data?.likes?.length || 0);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(data._id);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };
    fetchComments();
  }, [data._id]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      userId: user._id,
      name: user.username,
      text: newComment,
    };

    try {
      const res = await addComment(data._id, commentData);
      setComments((prev) => [...prev, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  return (
    <div className='Post'>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Like : Notlike}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
        <img src={CommentIcon} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '14px' }}>{likes} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span>{data.desc}</span>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <div className="add-comment">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleCommentSubmit}>Post</button>
        </div>

        <div className="comment-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <strong>{comment.name}</strong>: {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;

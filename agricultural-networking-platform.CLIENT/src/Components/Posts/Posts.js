import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    console.log("Current user from redux:", user);

    if (user && user._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className='Posts'>
      {loading ? (
        "Fetching Posts..."
      ) : (
        posts.map((post, id) => (
          <Post data={post} key={post._id || id} id={id} />
        ))
      )}
    </div>
  );
};

export default Posts;

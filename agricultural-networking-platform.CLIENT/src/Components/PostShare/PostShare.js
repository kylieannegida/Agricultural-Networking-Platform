import React, { useRef } from 'react';
import './PostShare.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
  const dispatch = useDispatch();
  const postUploading = useSelector((state) => state.postReducer.postUploading);
  const authData = useSelector((state) => state.authReducer.authData);
  const user = authData?.user; // Use optional chaining to safely access user
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef();

  // Prevent rendering until user is loaded
  if (!user || !user._id) {
    return null; // Or return a loading indicator: <div>Loading...</div>
  }

  const reset = () => {
    if (desc.current) {
      desc.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      await dispatch(uploadPost(newPost));
      reset();
    } catch (error) {
      console.error("Failed to upload post:", error);
    }
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />

      <form className="inputShareRow" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Share your farming experience..."
          required
          ref={desc}
        />
        <button
          className="button ps-button"
          type="submit"
          disabled={postUploading}
        >
          {postUploading ? "Sharing..." : "Share"}
        </button>
      </form>
    </div>
  );
};

export default PostShare;

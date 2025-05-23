import React from 'react';
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  // Use optional chaining for safe access
  const user = useSelector((state) => state.authReducer.authData?.user);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  if (!user) {
    // Return null or a loader if user data isn't loaded yet
    return null;
  }

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"}
          alt="Cover"
        />
        <img
          src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
          alt="Profile"
        />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "write about yourself..."}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers?.length ?? 0}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following?.length ?? 0}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts?.filter((post) => post.userId === user._id).length ?? 0}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location !== "profilePage" && (
        <span>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

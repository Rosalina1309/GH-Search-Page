import React from 'react';

interface UserProfileProps {
  username: string;
  userData: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, userData }) => {
  return (
    <div>
      <h2>{username}'s GitHub page</h2>
      <img src={userData.avatar_url} alt="User Avatar" className="user-avatar" />
      <p>Username: {userData.login}</p>
      <p>Bio: {userData.bio}</p>
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
      <p>Location: {userData.location}</p>
    </div>
  );
};

export default UserProfile;

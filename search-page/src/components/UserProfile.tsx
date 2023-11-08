import React from 'react';
import '../styles/userProfile.css'

interface UserProfileProps {
  username: string;
  userData: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, userData }) => {
  return (
    <div className="profile">
      <img src={userData.avatar_url} alt="User Avatar" className="user-avatar" />
      <div>
        <h3><em> Welcome {userData.login}!</em></h3>
        { userData.bio && <p><b>Bio:</b> {userData.bio}</p>}
        <p><b>Followers: </b>{userData.followers}</p>
        <p><b>Following:</b> {userData.following}</p>
        <p><b>Location:</b> {userData.location}</p>
      </div>
     
    </div>
  );
};

export default UserProfile;

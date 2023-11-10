import React from 'react';
import '../styles/userProfile.css'
import { UserData } from '../interfaces/UserData';

interface UserProfileProps {

  //The type of  username of the GitHub user.
  username: string;

  //The type of user data of the GitHub user.
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, userData }) => {
  return (
    <div className="profile">
      
      {/* User Avatar */}
      <img src={userData.avatar_url} alt="User Avatar" className="user-avatar" />

      {/* User Information */}
      <div className='infos'>
        <h3><em> Welcome {userData.login}!</em></h3>

         {/* Display Bio if available */}
        { userData.bio && <p><b>Bio:</b> {userData.bio}</p>}

        {/* Display Followers, Following, and Location */}
        <p><b>Followers: </b>{userData.followers}</p>
        <p><b>Following:</b> {userData.following}</p>
        <p><b>Location:</b> {userData.location}</p>
      </div>
     
    </div>
  );
};

export default UserProfile;



import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserRepos } from '../apiServices/fetchUserRepos';
import UserRepoData from '../interfaces/UserRepoData';
import { fetchUserByName } from '../apiServices/fetchUserByName';

const UserPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [repositories, setRepositories] = useState<UserRepoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const user = await fetchUserByName(username);
          console.log('user: ', user)
          const repos = await fetchUserRepos(username);
          console.log('repos: ', repos)

          setUserData(user);
          setRepositories(repos);
        }
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    };

    fetchData();
  }, [username]);

  
  return (
    <div className = "userpage">
      <Link to="/">GitHub Search Page</Link>
      {userData && (
        <div>
          <h2> {username}'s GitHub page</h2>
          <img src={userData.avatar_url} alt="User Avatar" className="user-avatar" />
          <p>Username: {userData.login}</p>
          <p>Bio: {userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Location: {userData.location}</p>
        </div>
      )}
    
      {repositories.length > 0 && (
  <div>
    <h2>User Repositories for {username}</h2>
    <ul>
    {repositories.map((repo) => (
  <li key={repo.id}>
    {repo.name} 
    <div>
    (Languages: {Array.isArray(repo.languages) && repo.languages.length > 0 ? repo.languages.join(', ') : 'N/A'})
    </div>
  </li>
))}
    </ul>
  </div>
)}

    </div>
  );
};

export default UserPage;

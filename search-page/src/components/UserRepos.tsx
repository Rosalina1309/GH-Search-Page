import React from 'react';
import UserRepoData from '../interfaces/UserRepoData';

interface UserReposProps {
  username: string;
  repositories: UserRepoData[];
}

const UserRepos: React.FC<UserReposProps> = ({ username, repositories }) => {
  return (
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
  );
};

export default UserRepos;

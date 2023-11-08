import React from 'react';
import UserRepoData from '../interfaces/UserRepoData';
import '../styles/userRepos.css'

interface UserReposProps {
  username: string;
  repositories: UserRepoData[];
}

const UserRepos: React.FC<UserReposProps> = ({ username, repositories }) => {
  return (
    <div className='repos'>
      
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
              <p className='username'>{repo.name} </p>
              <p>(Languages: {Array.isArray(repo.languages) && repo.languages.length > 0 ? repo.languages.join(', ') : 'N/A'})</p>
              <p>Link to repository :</p> 
              <p><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;

// Import React and the UserRepoData interface
import React from 'react';
import UserRepoData from '../interfaces/UserRepoData';
import '../styles/userRepos.css';// Import the CSS file for styling

// Define the props interface
interface UserReposProps {
  username: string;
  repositories: UserRepoData[];
}

// Define the UserRepos functional component
const UserRepos: React.FC<UserReposProps> = ({ username, repositories }) => {
  return (
    <div className='repos'>
      
      <ul>
         {/* Map through the repositories array */}
        {repositories.map((repo) => ( 
          <li key={repo.id}>
          {/* List item for each repository, using 'id' as the key */}

              {/* Display the repository name */}
              <div className='username'>{repo.name} </div>

              {/* Display the languages used in the repository, or 'N/A' if not available */}
              <div>(Languages: {Array.isArray(repo.languages) && repo.languages.length > 0 ? repo.languages.join(', ') : 'N/A'})</div>
              <div>Link to repository :</div> 

              {/* Link to the repository on GitHub, opens in a new tab */}
              <div><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;

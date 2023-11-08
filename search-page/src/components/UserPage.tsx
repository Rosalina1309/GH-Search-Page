

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserRepos } from '../apiServices/fetchUserRepos';
import { fetchUserByName } from '../apiServices/fetchUserByName';
import UserRepoData from '../interfaces/UserRepoData';
import UserProfile from './UserProfile';
import UserRepos from './UserRepos';
import '../styles/userPage.css';
import githubIcon from '../assets/github-mark.png'
import LoadingPage from '../components/LoadingPage'


const UserPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [repositories, setRepositories] = useState<UserRepoData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('name'); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const user = await fetchUserByName(username);
          console.log('user: ', user);
          const repos = await fetchUserRepos(username);
          console.log('repos: ', repos);

          setUserData(user);
          setRepositories(repos);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user repositories:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleSearch = async () => {
    try {
      if (searchValue && username) {
        const repos = await fetchUserRepos(username);
        let filteredRepos: UserRepoData[] = [];
        if (searchType === 'name') {
          filteredRepos = repos.filter((repo) =>
            repo.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        } else if (searchType === 'language') {
          filteredRepos = repos.filter((repo) =>
            repo.languages?.some((language) => language.toLowerCase().includes(searchValue.toLowerCase()))
          );
        }
        setRepositories(filteredRepos);
      }
    } catch (error) {
      console.error('Error searching repositories:', error);
    }
  };
  

  return (
    <div className="userpage">
    {loading ? (
      <LoadingPage /> 
    ) : (
      <>
        <div className='navbar-userpage'>
          <h2> GitHub Repositories</h2>
          <Link to="/" className="LinkClass">
            <img src={githubIcon} alt="GitHub Icon" className="github-icon" />
          </Link>
        </div>
        <div className='body'>
          <div className='left'>
            {userData && username && <UserProfile username={username} userData={userData} />}
          </div>
          <div className='right'>
            <h2>{username}'s Repositories</h2>
            <select onChange={(e) => setSearchType(e.target.value)} className='dropdown'>
              <option value="name">Repository Name</option>
              <option value="language">Language</option>
            </select>
            <input
              placeholder={searchType === 'name' ? 'Search by repository name' : 'Search by language'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='input'
            />
            <button onClick={handleSearch} className='button'>Search</button>
            {repositories.length > 0 && username && <UserRepos username={username} repositories={repositories} />}
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default UserPage;

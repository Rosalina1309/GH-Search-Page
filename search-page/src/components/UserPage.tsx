

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserRepos } from '../apiServices/fetchUserRepos';
import { fetchUserByName } from '../apiServices/fetchUserByName';
import UserRepoData from '../interfaces/UserRepoData';
import UserProfile from './UserProfile';
import UserRepos from './UserRepos';
import '../styles/userPage.css';
import githubIcon from '../assets/github-mark.png';
import LoadingPage from '../components/LoadingPage';


/**
 * Functional component representing the user page, displaying user details and repositories.
 *
 * @component
 * @returns {JSX.Element} UserPage component.
 */

const UserPage: React.FC = () => {

  // Get the 'username' parameter from the URL
  const { username } = useParams<{ username: string }>();

  // State variables to manage user data, repositories, search input, search type, and loading state
  const [userData, setUserData] = useState<any>(null);
  const [repositories, setRepositories] = useState<UserRepoData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('name'); 
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch user data and repositories when the component mounts or 'username' parameter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {

          // Fetch user data and repositories based on the username
          const user = await fetchUserByName(username);
          // console.log('user: ', user);
          const repos = await fetchUserRepos(username);
          // console.log('repos: ', repos);

          // Set user data, repositories, and loading state
          setUserData(user);
          setRepositories(repos);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user repositories:', error);
        setLoading(false);
      }
    };
    //Invoke the function
    fetchData();

    // The useEffect hook has a dependency array containing the username variable. This means that the effect will be re-run whenever the username variable changes. It helps avoid unnecessary re-fetching of data if the username remains unchanged.
  }, [username]);

  // Function to handle repository search based on input value and search type
  const handleSearch = async () => {
    try {
      if (searchValue && username) {

        // Fetch user repositories
        const repos = await fetchUserRepos(username);
        let filteredRepos: UserRepoData[] = [];

        // Filter repositories based on search type and input value
        if (searchType === 'name') {
          filteredRepos = repos.filter((repo) =>
            repo.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        } else if (searchType === 'language') {
          filteredRepos = repos.filter((repo) =>
            repo.languages?.some((language) => language.toLowerCase().includes(searchValue.toLowerCase()))
          );
        }

        // Set filtered repositories
        setRepositories(filteredRepos);
      }
    } catch (error) {
      console.error('Error searching repositories:', error);
    }
  };
  
  // JSX structure for the user page including user profile, search options, and repository display
  return (
    <div className="userpage">
      
    {/* If the data is still being fetched that means loading is still true then we only show the LoadingPage component here */}
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

        {/* It checks if both userData and username are truthy values. If they are, it renders the <UserProfile /> component with username and userData as props inside the <div> element with the class name 'left'. If either userData or username (or both) are falsy, nothing is rendered inside the <div>. This conditional rendering ensures that the <UserProfile /> component is only rendered when both userData and username have valid values, preventing potential errors. */}
          <div className='left'>
            {userData && username && <UserProfile username={username} userData={userData} />}
          </div>
          <div className='right'>
            <h2>List of Repositories</h2>

            {/* The onChange event triggers a function that sets the searchType state based on the selected option's value (e.target.value). The className='dropdown' applies a CSS class to style the dropdown.  */}
            <select onChange={(e) => setSearchType(e.target.value)} className='dropdown'>
              <option value="name">Name</option>
              <option value="language">Language</option>
            </select>
                        
            {/* This code creates an <input> element where the placeholder text dynamically changes based on the searchType state (either 'Search by repository name' or 'Search by language'). The value property is controlled by the searchValue state, and the onChange event updates the searchValue state as the user types. The className='input' applies a CSS class to style the input field. */}
            <input
              placeholder='Search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='input'
            />

            {/* onClick={handleSearch}: Attaches the handleSearch function as the click event handler for the button. */}
            <button onClick={handleSearch} className='button'>Search</button>

            {/* Checks if the repositories array has elements. Checks if the username variable is truthy. Renders the <UserRepos> component with the username and repositories props if both conditions are met. */}
            {repositories.length > 0 && username && <UserRepos username={username} repositories={repositories} />}
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default UserPage;

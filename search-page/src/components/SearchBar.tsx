
import React, { useState } from "react";
import { fetchUserByName } from "../apiServices/fetchUserByName";
import { UserData } from "../interfaces/UserData";
import "../styles/searchBar.css";
import "../App.css"
import { Link } from "react-router-dom";
import githubIcon from '../assets/github-mark.png';

/**
 * Functional component representing the GitHub user search interface.
 * Allows users to input a GitHub username, fetch user data, and display it.
 *
 * @component
 * @returns {JSX.Element} SearchBar component.
 */

export default function SearchApp(): JSX.Element {

  // State variables to manage input, user data, loading state, and errors
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


    /**
   * Handles the form submission when searching for a GitHub user by username.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();// Prevents the default form submission behavior 
    try {

      // Set loading state to true while fetching data
      setLoading(true); 

       // Call the fetchUserByName function to retrieve user data
      const fetchedUserData: UserData = await fetchUserByName(username);

      //setUserData to the data we have just fetched
      setUserData(fetchedUserData);

      //as the data is there we set setError to null 
      setError(null);
    } catch (error) {

       // Handle errors during data fetching
      setError("User not found or error occurred while fetching data.");

      // Reset user data in case of an error
      setUserData(null);
    } finally {

      // Set loading state to false regardless of success or failure
      setLoading(false);
    }
  };

  // JSX structure for the search form, loading indicator, error message, and user data display
  return  (
    <header className="App-header">
    <h1> GitHub Search Page</h1>
    <div className="search-container">

      {/* Search Form: Allows users to input a GitHub username and triggers the handleFormSubmit function on submission. */}
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          placeholder="Search for GitHub username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Loading and Error Messages: Conditionally displays loading and error messages based on the component's state. */}
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {userData && (
        <div className="user-container">
          <div className="user-data-box">
            <img src={userData.avatar_url} alt="User Avatar" className="user-avatar" />
            <div className="user-details">
              <h2>{userData.login}</h2>
              <p>Name: {userData.name}</p>
              <p>Location: {userData.location}</p>
              <Link to={`/userpage/${userData.login}`}>
                <button className="gotorepo">Go to {userData.login} repos</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
    <div>
    {/* GitHub Icon: Positioned at the bottom-right corner of the header using the .image-container class. */}
    <div className="image-container">
    <img src={githubIcon} alt="GitHub Icon" className="bottom-right-image" />
      </div>
    </div>
    </header>
  );
}

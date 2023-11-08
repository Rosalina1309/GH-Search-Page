
import React, { useState } from "react";
import { fetchUserByName } from "../apiServices/fetchUserByName";
import { UserData } from "../interfaces/UserData";
import "../styles/searchBar.css";
import "../App.css"
import { Link } from "react-router-dom";
import githubIcon from '../assets/github-mark.png'

export default function SearchApp(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    try {
      setLoading(true);
      const fetchedUserData: UserData = await fetchUserByName(username);
      setUserData(fetchedUserData);
      setError(null);
    } catch (error) {
      setError("User not found or error occurred while fetching data.");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return  (
    <header className="App-header">
    <h1> GitHub Search Page</h1>
    <div className="search-container">
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
    <div className="image-container">
    <img src={githubIcon} alt="GitHub Icon" className="bottom-right-image" />
      </div>
    </div>
    </header>
  );
}

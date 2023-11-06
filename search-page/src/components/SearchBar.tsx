
import React, { useState } from "react";
import { fetchUserByName } from "../apiServices/fetchUserByName";
import { UserData } from "../interfaces/UserData";

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

  return (
    <div className="search-bar">
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Search for GitHub username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Username: {userData.login}</p>
          <p>Name: {userData.name}</p>
          <p>Location: {userData.location}</p>
          <img src={userData.avatar_url} alt="User Avatar" style={{ width: "100px", height: "100px" }} />
        </div>
      )}
    </div>
  );
}

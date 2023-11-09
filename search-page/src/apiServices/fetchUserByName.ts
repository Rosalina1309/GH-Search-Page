// I started with writing the .env file first with the GitHub API url under the gloabl variable called REACT_APP_GITHUB_API_ROOT_URL
// It had to have the REACT_APP part for react to recognize it.
// Import the axios library for making HTTP requests
import axios from 'axios';

// Retrieve the GitHub API root URL from the environment variables
const root_url = process.env.REACT_APP_GITHUB_API_ROOT_URL;

// Function to fetch user data by username asynchronously
export const fetchUserByName = async (username: string) => {
  //the console.log is for debugging purpose
  // console.log(username)
  try {
    // Make a GET request to the GitHub API endpoint for the specified username
    const response = await axios.get(`${root_url}/users/${username}`);

    // console.log('response data from function fetchUserByName: ', response.data)

    // Return the data received from the API response
    return response.data;
  } catch (error) {
    
    // console.log(error)

    // If there is an error during the API request, throw the error for handling elsewhere
    throw(error)
  }
}
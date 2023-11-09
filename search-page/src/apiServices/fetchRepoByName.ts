
import axios from 'axios';

const root_url = process.env.REACT_APP_GITHUB_API_ROOT_URL;

/**
 * Asynchronous function to fetch a specific repository by its username and name,
 * including languages data.
 *
 * @param {string} username - GitHub username to which the repository belongs.
 * @param {string} name - Name of the repository to be fetched.
 * @returns {Promise<object>} - A promise that resolves to an object representing the repository
 *                             with languages data included.
 * @throws {Error} - Throws an error if there is a network error or if the API request fails.
 */

export const fetchRepoByName = async (username: string, name: string) => {
  try {

    // Make a GET request to the GitHub API endpoint to fetch the specific repository
    const response = await axios.get(`${root_url}/repos/${username}/${name}`);

    // Extract repository data from the response
    const repo = response.data;

    // Make a GET request to the repository's languages endpoint
    const languagesResponse = await axios.get(repo.languages_url);

    // Extract language keys from the languages data
    const languagesData = Object.keys(languagesResponse.data);

    // Create a new object including repository data and languages data
    const repoWithLanguages = {
      ...repo,
      languages: languagesData,
    };

    // Return the repository object with languages data added to it
    return repoWithLanguages;
  } catch (error) {

    // console.error('Error fetching repository:', error);

    // Throw the error for handling elsewhere in the application
    throw error;
  }
};

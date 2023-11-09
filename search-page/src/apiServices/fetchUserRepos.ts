import axios from 'axios';
// Import the UserRepoData interface for type checking becuz TS is really strict about its type
import UserRepoData from '../interfaces/UserRepoData';


/**
 * Asynchronous function to fetch user repositories with languages data.
 *
 * @param {string} username - GitHub username for which repositories are to be fetched.
 * @returns {Promise<UserRepoData[]>} - A promise that resolves to an array of user repositories with languages data.
 * @throws {Error} - Throws an error if there is a network error or if the API request fails.
 */

const root_url = process.env.REACT_APP_GITHUB_API_ROOT_URL;
export const fetchUserRepos = async (username: string) => {

  // console.log(username)

  try {

    // Make a GET request to the GitHub API endpoint to fetch user repositories
    const response = await axios.get(`${root_url}/users/${username}/repos`);

    // Extract repositories data from the response and type cast it to UserRepoData[]
    const repos: UserRepoData[] = response.data;

    // console.log(repos)

    // Fetch languages data for each repository concurrently using Promise.all
    const reposWithLanguages = await Promise.all(
      repos.map(async (repo) => {

        // Make a GET request to the repository's languages endpoint
        const languagesResponse = await axios.get(repo.languages_url);

        // Extract the language keys from the languages data
        const languagesData = Object.keys(languagesResponse.data); 

        // console.log('languagesData: ',languagesData)

        // Return the repository object with languages data added to it
        return {
          ...repo,
          languages: languagesData,
        };
      })
    );
    // Return the array of repositories with languages data
    return reposWithLanguages;

  } catch (error) {

    console.log(error)

    // Throw the error for handling elsewhere in the application
    throw(error)
  }
}
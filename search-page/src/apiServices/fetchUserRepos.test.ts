import axios from 'axios';
import { fetchUserRepos } from './fetchUserRepos';
import UserRepoData from '../interfaces/UserRepoData';

jest.mock('axios'); // Mock Axios

describe('fetchUserRepos', () => {
  
  it('handles Axios request error when fetching repositories', async () => {
    const username = 'rosalina1309';

    // Set up the Axios mock response to simulate an error when fetching repositories
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    try {
      await fetchUserRepos(username);
      // The function should throw an error, so this line should not be reached.
      fail('Expected an error, but no error was thrown.');
    } catch (error: any) {
      // Use ': any' to explicitly specify the type of the 'error' variable
      // Check if the error message is as expected
      expect(error.message).toBe('Network error');
    }
  });
})
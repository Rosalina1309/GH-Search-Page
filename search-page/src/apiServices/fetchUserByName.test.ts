import axios from 'axios';
import { fetchUserByName } from './fetchUserByName';

jest.mock('axios'); // Mock Axios

describe('fetchUserByName', () => {
  it('fetches user data', async () => {
    const mockUserData = {
      "login": "Rosalina1309",
      "id": 138449874,
      "node_id": "U_kgDOCECT0g",
      "avatar_url": "https://avatars.githubusercontent.com/u/138449874?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Rosalina1309",
      "html_url": "https://github.com/Rosalina1309",
      "followers_url": "https://api.github.com/users/Rosalina1309/followers",
      "following_url": "https://api.github.com/users/Rosalina1309/following{/other_user}",
      "gists_url": "https://api.github.com/users/Rosalina1309/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Rosalina1309/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Rosalina1309/subscriptions",
      "organizations_url": "https://api.github.com/users/Rosalina1309/orgs",
      "repos_url": "https://api.github.com/users/Rosalina1309/repos",
      "events_url": "https://api.github.com/users/Rosalina1309/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Rosalina1309/received_events",
      "type": "User",
      "site_admin": false,
      "name": "Rosalina",
      "company": null,
      "blog": "",
      "location": "Germany",
      "email": null,
      "hireable": null,
      "bio": "Hi I'm Rosie - a Full Stack Developer. ",
      "twitter_username": null,
      "public_repos": 8,
      "public_gists": 0,
      "followers": 7,
      "following": 17,
      "created_at": "2023-07-03T09:01:03Z",
      "updated_at": "2023-11-08T13:13:15Z"
  };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockUserData });

    const username = 'rosalina1309';

    try {
      const userData = await fetchUserByName(username);
      
      expect(userData).toEqual(mockUserData);
      
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_GITHUB_API_ROOT_URL}/users/${username}`);
    } catch (error) {
      
      throw error;
    }
  });
  it('handles Axios request error', async () => {
    
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    const username = 'rosalina1309';

    try {
      await fetchUserByName(username);
      
      fail('Expected an error, but no error was thrown.');
    } catch (error: any) {
    
      expect(error.message).toBe('Network error');
    }
  });
  it('handles empty response', async () => {
    // Set up the Axios mock response to return an empty object
    (axios.get as jest.Mock).mockResolvedValue({ data: {} });

    const username = 'rosalina1309';

    const userData = await fetchUserByName(username);

    // Assert that the function returns an empty object
    expect(userData).toEqual({});
  });
});

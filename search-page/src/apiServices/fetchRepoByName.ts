
import axios from 'axios';

const root_url = process.env.REACT_APP_GITHUB_API_ROOT_URL;

export const fetchRepoByName = async (username: string, name: string) => {
  try {
    const response = await axios.get(`${root_url}/repos/${username}/${name}`);
    const repo = response.data;

    const languagesResponse = await axios.get(repo.languages_url);
    const languagesData = Object.keys(languagesResponse.data);

    const repoWithLanguages = {
      ...repo,
      languages: languagesData,
    };

    return repoWithLanguages;
  } catch (error) {
    console.error('Error fetching repository:', error);
    throw error;
  }
};

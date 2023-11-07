import axios from 'axios';
import UserRepoData from '../interfaces/UserRepoData';


const root_url = process.env.REACT_APP_GITHUB_API_ROOT_URL;
export const fetchUserRepos = async (username: string) => {
  console.log(username)
  try {
    const response = await axios.get(`${root_url}/users/${username}/repos`);
    const repos: UserRepoData[] = response.data;

    const reposWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        const languagesResponse = await axios.get(repo.languages_url);
        const languagesData = Object.keys(languagesResponse.data); 
        console.log('languagesData: ',languagesData)
        return {
          ...repo,
          languages: languagesData,
        };
      })
    );

    return reposWithLanguages;
  } catch (error) {
    console.log(error)
    throw(error)
  }
}
import axios from 'axios';

const root_url = process.env.REACT_APP_GITHUB_API_ROOT_URL;
export const fetchUserByName = async (username: string) => {
  // console.log(username)
  try {
    const response = await axios.get(`${root_url}/users/${username}`);
    // console.log('response data from function fetchUserByName: ', response.data)
    return response.data;
  } catch (error) {
    // console.log(error)
    throw(error)
  }
}
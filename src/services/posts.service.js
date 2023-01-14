import axios from 'axios';

const APIKey = '31303071-b4e5345642141d1af1d763c20';

const postsApi = axios.create({
  baseURL: `https://pixabay.com/api/?key=${APIKey}`,
});

export const getPosts = async (params = {}) => {
  const { data } = await postsApi.get('', {
    params: {
      ...params,
    },
  });

  // console.log('data ', data);
  return data;
};

import axios from 'axios';

const API_KEY = '36855229-dc07620e38f9e8d214dc0242a';
const PER_PAGE = 12;

export const fetchImages = async (query, page) => {
  const URL = 'https://pixabay.com/api/';

  const response = await axios.get(URL, {
    params: {
      q: query,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
    },
  });
  return response.data;
};

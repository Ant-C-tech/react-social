import { apiClient } from '../../services/apiClient';

export const getNews = (
  apiKey,
  selectedCountries,
  selectedCategories,
  selectedLanguages,
  keyword,
  nextPage,
) => {
  const params = {
    apikey: apiKey,
    page: nextPage,
  };

  if (selectedCountries[0] !== 'all') params.country = selectedCountries.join();
  if (selectedCategories[0] !== 'all')
    params.category = selectedCategories.join();
  if (selectedLanguages[0] !== 'all')
    params.language = selectedLanguages.join();
  if (keyword !== '') params.q = keyword;

  return apiClient({
    method: 'get',
    baseURL: 'https://newsdata.io/api/1/news',
    params: params,
  })();
};

import { apiClient } from '../../../services/apiClient';

export const getNews = (apiKey, selectedCountries, selectedCategories, selectedLanguages, nextPage) => {
	const params = {
		apikey: apiKey,
		page: nextPage,
	};

	if (selectedCountries[0] !== 'all') params.country = selectedCountries.join();
	if (selectedCategories[0] !== 'all') params.category = selectedCategories.join();
	if (selectedLanguages[0] !== 'all') params.language = selectedLanguages.join();

	return apiClient({
		method: 'get',
		baseURL: 'https://newsdata.io/api/1/news',
		params:params,
	})();
};

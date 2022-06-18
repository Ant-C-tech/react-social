import { apiClient } from '../../../services/apiClient';

export const getNews = (apiKey, selectedCountry, selectedCategory, selectedLanguages, nextPage) => {
		return (apiClient({
			method: 'get',
			baseURL: 'https://newsdata.io/api/1/news',
			params: {
				apikey: apiKey,
				country: selectedCountry.join(),
				category: selectedCategory.join(),
				language: selectedLanguages.join(),
				page: nextPage
			},
    }))();
};

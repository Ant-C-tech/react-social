import { apiClient } from '../../services/apiClient';

export const getNews = (apiKey, selectedCountry = null) => {
		return (apiClient({
			method: 'get',
			baseURL: 'https://newsdata.io/api/1/news',
			params: {
				apikey: apiKey,
				country: selectedCountry.toLowerCase(),
			},
    }))();
};

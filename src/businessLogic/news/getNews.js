import { apiClient } from '../../services/apiClient';

export const getNews = (apiKey, selectedCountry) => {
		return (apiClient({
			method: 'get',
			baseURL: 'https://newsdata.io/api/1/news',
			params: {
				apikey: apiKey,
				country: selectedCountry.join().toLowerCase(),
			},
    }))();
};

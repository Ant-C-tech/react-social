import Axios from 'axios';

export const apiClient = (requestParams) => {
	const customAxios = Axios.create(requestParams);

	const requestHandler = (request) => {
		return request;
	};

	const responseHandler = (response) => {
		return response;
	};

  const errorHandler = (error) => {
		return Promise.reject(error);
	};

	customAxios.interceptors.request.use((request) => requestHandler(request), (error) => errorHandler(error));
	customAxios.interceptors.response.use((response) => responseHandler(response), (error) => errorHandler(error));

	return customAxios;
};

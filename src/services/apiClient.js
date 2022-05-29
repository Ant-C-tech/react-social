import Axios from 'axios';

// export const apiClient = (requestParams) => {
//   const axiosInstance = axios.create(requestParams);

// 	axiosInstance.interceptors.response.use(
// 		(response) => response,
// 		(error) => {
// 			if (!error.response) {
// 				console.log('No error response!');
// 			} else if (error.response.status === 401) {
// 				console.log('401')
// 			}
// 			return error;
// 		},
// 	);

// 	return new Promise((resolve, reject) => {
// 		axiosInstance.get()
// 			.then((result) => {
// 				console.log(result.status);
// 				if (result.status === 200) {
// 					resolve(result);
// 				} else {
// 					reject(result);
// 				}
// 			})
// 			.catch((error) => {
// 				console.log('error: ', error);
// 				reject(error);
// 			});
// 	});
// };

export const apiClient = (requestParams) => {
	const customAxios = Axios.create(requestParams);

	const requestHandler = (request) => {
		return request;
	};

	const responseHandler = (response) => {
		return response;
	};

  const errorHandler = (error) => {
    console.log('error', error);
		return Promise.reject(error);
	};

	customAxios.interceptors.request.use((request) => requestHandler(request), (error) => errorHandler(error));
	customAxios.interceptors.response.use((response) => responseHandler(response), (error) => errorHandler(error));

	return customAxios;
};

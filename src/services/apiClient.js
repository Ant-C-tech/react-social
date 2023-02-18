import Axios from "axios";

export const apiClient = (requestParams) => {
    const customAxios = Axios.create(requestParams);

    // Add a request interceptor
    customAxios.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            if (!navigator.onLine) {
                const connectionCustomError = new Error();
                connectionCustomError.message = "Internet Disconnected";
                return Promise.reject(connectionCustomError);
            }
            if (
                config.params.apikey?.length < 40 ||
                config.params.apikey?.length > 41
            ) {
                const apiKeyCustomError = new Error();
                apiKeyCustomError.message = "API Key Error";
                return Promise.reject(apiKeyCustomError);
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    customAxios.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        }
    );

    return customAxios;
};

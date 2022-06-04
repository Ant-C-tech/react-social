export const createErrorMessage = (news, error) => {
	if (error === 'Internet Disconnected') {
		return { type: 'warning', title: error, text: 'Please, check your internet connection' };
	} else if (error === 'API Key Error') {
		return { type: 'warning', title: error, text: 'Please, use valid API Key' };
	} else if (news.length === 0) {
		return { type: 'warning', title: error, text: 'Please, use valid API Key' };
	} else {
		return { type: 'warning', title: error, text: 'Please, try to change your parameters' };
	}
};

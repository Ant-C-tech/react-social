export const createErrorMessage = (news, error) => {
	const errorMessageTemplate = {
		type: 'warning',
		title: error,
	};

	if (error === 'Internet Disconnected') {
		errorMessageTemplate.text = 'Please, check your internet connection';
	} else if (error === 'API Key Error' || news.length === 0) {
		errorMessageTemplate.text = 'Please, use valid API Key';
	} else {
		errorMessageTemplate.text = 'Please, try to change your parameters';
	}
	return errorMessageTemplate;
};

export const createErrorMessage = (news, error) => {
	const errorMessageTemplate = {
		type: 'warning',
		title: error,
		text: ''
	};

	switch (error) {
		case 'Internet Disconnected':
			errorMessageTemplate.text = 'Please, check your internet connection';
			break;

		case 'API Key Error':
			errorMessageTemplate.text = 'Please, use valid API Key';
			break;

		default:
			errorMessageTemplate.text = 'Please, try to change your parameters';
			break;
	}

	if (news.length === 0) errorMessageTemplate.text = 'Please, use valid API Key';

	return errorMessageTemplate;
};

import { countries } from 'country-data';

export const getAdditionalDataForNewsControls = () => {
	const labelOptions = {};
	const labelIconOptionsForCountry = {};
	const labelIconOptionsForLanguage = {};

	countries.all.forEach((country) => {
		labelOptions[country.alpha2.toLowerCase()] = country.name;
		labelIconOptionsForCountry[country.alpha2.toLowerCase()] = <span>{country.emoji}</span>;

		let languageCode;
		switch (country.alpha2.toLowerCase()) {
			case 'uk':
				break;
			case 'cn':
				languageCode = 'zh';
				break;
			case 'cz':
				languageCode = 'cs';
				break;
			case 'gr':
				languageCode = 'el';
				break;
			case 'il':
				languageCode = 'he';
				break;
			case 'in':
				languageCode = 'hi';
				break;
			case 'id':
				languageCode = 'in';
				break;
			case 'kr':
				languageCode = 'ko';
				break;
			case 'ua':
				languageCode = 'uk';
				break;
			case 'gb':
				languageCode = 'en';
				break;

			default:
				languageCode = country.alpha2.toLowerCase();
		}
		labelIconOptionsForLanguage[languageCode] = <span>{country.emoji}</span>;
	});

	return {
		labelOptions,
		labelIconOptionsForCountry,
		labelIconOptionsForLanguage,
	};
};

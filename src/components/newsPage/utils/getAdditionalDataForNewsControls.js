import { countries } from 'country-data';

export const getAdditionalDataForNewsControls = () => {
	const labelOptionForCountries = {};
	const labelIconOptionsForCountries = {};
	const labelIconOptionsForLanguages = {};

	countries.all.forEach((country) => {
		labelOptionForCountries[country.alpha2.toLowerCase()] = country.name;
		labelIconOptionsForCountries[country.alpha2.toLowerCase()] = <span>{country.emoji}</span>;

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
		labelIconOptionsForLanguages[languageCode] = <span>{country.emoji}</span>;
	});

	return {
		labelOptionForCountries,
		labelIconOptionsForCountries,
		labelIconOptionsForLanguages,
	};
};

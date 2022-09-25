import { languagesAvailableForFilterNews } from '../../constants/languagesAvailableForFilterNews'

export const getLanguageAbbreviationsByNames = (languages) => {
  const dataBaseOfLanguages = Object.entries(languagesAvailableForFilterNews);
  const languageAbbreviations = []
	languages.forEach((language) => {
		dataBaseOfLanguages.forEach((dataBaseItem) => {
			const languageAbbreviation = dataBaseItem[0];
			const languageName = dataBaseItem[1];
			if (languageName.toLocaleLowerCase() === language) {
				languageAbbreviations.push(languageAbbreviation)
			}
		});
	});
	return languageAbbreviations
}

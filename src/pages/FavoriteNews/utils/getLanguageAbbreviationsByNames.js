import { DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS } from '@constants';

export const getLanguageAbbreviationsByNames = (languages) => {
  const dataBaseOfLanguages = Object.entries(
    DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS,
  );
  const languageAbbreviations = [];
  languages.forEach((language) => {
    dataBaseOfLanguages.forEach((dataBaseItem) => {
      const languageAbbreviation = dataBaseItem[0];
      const languageName = dataBaseItem[1];
      if (languageName.toLocaleLowerCase() === language) {
        languageAbbreviations.push(languageAbbreviation);
      }
    });
  });
  return languageAbbreviations;
};

import { WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE } from '@constants';
import { getLanguageAbbreviationsByNames } from './getLanguageAbbreviationsByNames';

export const getLanguagesForPrompt = (newsForPrompt) => {
  const languagesForPrompt = [];
  newsForPrompt.forEach((news) => {
    languagesForPrompt.push(news.language);
  });

  const uniqLanguagesForPrompt = [...new Set(languagesForPrompt)];

  return uniqLanguagesForPrompt.map((languageName) => {
    return [
      WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE[
        getLanguageAbbreviationsByNames([languageName])
      ],
      languageName.charAt(0).toUpperCase() +
        languageName.slice(1).toLowerCase(),
    ];
  });
};

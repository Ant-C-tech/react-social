import { languagesAvailableForFilterNews } from '@constants/languagesAvailableForFilterNews';

export const getLanguagesObject = (languagesAvailableForFilterFavoriteNews) => {
  const languagesObject = {};

  languagesAvailableForFilterFavoriteNews.forEach((language) => {
    languagesObject[language] = languagesAvailableForFilterNews[language];
  });

  return languagesObject;
};

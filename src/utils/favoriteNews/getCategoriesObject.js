import { categoriesAvailableForFilterNews } from '@constants/categoriesAvailableForFilterNews';

export const getCategoriesObject = (
  categoriesAvailableForFilterFavoriteNews,
) => {
  const categoriesObject = {};

  categoriesAvailableForFilterFavoriteNews.forEach((category) => {
    categoriesObject[category] = categoriesAvailableForFilterNews[category];
  });

  return categoriesObject;
};

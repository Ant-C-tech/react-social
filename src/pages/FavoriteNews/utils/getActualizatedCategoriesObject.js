import { DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS } from '@constants';

export const getActualizatedCategoriesObject = (
  categoriesAvailableForFilterFavoriteNews,
) => {
  const ActualizatedCategoriesObject = {};

  categoriesAvailableForFilterFavoriteNews.forEach((category) => {
    ActualizatedCategoriesObject[category] =
      DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS[category];
  });

  return ActualizatedCategoriesObject;
};

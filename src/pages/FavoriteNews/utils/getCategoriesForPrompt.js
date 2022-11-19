import { DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS } from '@constants';

export const getCategoriesForPrompt = (newsForPrompt) => {
  const categoriesForPrompt = [];
  newsForPrompt.forEach((news) => {
    news.category.forEach((categoryItem) => {
      categoriesForPrompt.push(categoryItem);
    });
  });
  const uniqCategoriesForPrompt = [...new Set(categoriesForPrompt)];

  return uniqCategoriesForPrompt.map((categoryName) => {
    return [
      DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS[categoryName],
      categoryName.charAt(0).toUpperCase() +
        categoryName.slice(1).toLowerCase(),
    ];
  });
};

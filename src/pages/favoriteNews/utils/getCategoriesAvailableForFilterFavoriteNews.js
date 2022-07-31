export const getCategoriesAvailableForFilterFavoriteNews = (favoriteNews) => {
	const favoriteNewsCategories = [];
	favoriteNews.forEach(({ category }) => {
		favoriteNewsCategories.push(...category);
	});

	return [ 'all', ...[ ...new Set(favoriteNewsCategories) ] ]
};

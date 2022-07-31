import { categoriesAvailableForFilterNews } from '../../../constants/categoriesAvailableForFilterNews';

export const getCategoriesObject = (categoriesArray) => {
	const categoriesAvailableForFilterFavoriteNews = {};
	categoriesArray.forEach((category) => {
		categoriesAvailableForFilterFavoriteNews[category] = categoriesAvailableForFilterNews[category];
	});
	return categoriesAvailableForFilterFavoriteNews;
};

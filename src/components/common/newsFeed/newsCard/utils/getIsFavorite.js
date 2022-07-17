export const getIsFavorite = (favoriteNews, newsLink) => {
		let isFavorite = false
		favoriteNews.forEach((currentFavoriteNews) => {
			if (Object.keys(currentFavoriteNews)[0] === newsLink) {
				isFavorite = true
			}
		})
		return isFavorite
	};

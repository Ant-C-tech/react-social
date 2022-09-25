export const getIsFavorite = (favoriteNews, newsLink) => {
		let isFavorite = false
		favoriteNews.forEach((currentFavoriteNews) => {
			if (currentFavoriteNews.link === newsLink) {
				isFavorite = true
			}
		})
		return isFavorite
	};

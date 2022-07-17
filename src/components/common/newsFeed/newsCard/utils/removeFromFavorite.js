export const removeFromFavorite = (favoriteNews, setFavoriteNews, news) => {
	setFavoriteNews(favoriteNews.filter((currentFavoriteNews) => Object.keys(currentFavoriteNews)[0] !== news.link));
};

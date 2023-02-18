export const removeFromFavorite = (favoriteNews, setFavoriteNews, news) => {
    setFavoriteNews(
        favoriteNews.filter(
            (currentFavoriteNews) => currentFavoriteNews.link !== news.link
        )
    );
};

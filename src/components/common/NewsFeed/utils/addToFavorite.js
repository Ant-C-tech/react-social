export const addToFavorite = (favoriteNews, setFavoriteNews, news) => {
    setFavoriteNews([...favoriteNews, news]);
};

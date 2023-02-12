export const updateFavoriteNewsWithNewNote = (
  favoriteNews,
  setFavoriteNews,
  indexOfTargetNews,
  targetPart,
  newNote,
) => {
  setFavoriteNews(
    favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
      if (currentFavoriteNewsIndex === indexOfTargetNews) {
        !currentFavoriteNews.notes && (currentFavoriteNews['notes'] = {});
        !currentFavoriteNews.notes[targetPart] &&
          (currentFavoriteNews.notes[targetPart] = []);

        currentFavoriteNews.notes[targetPart].push(newNote);
        return currentFavoriteNews;
      } else {
        return currentFavoriteNews;
      }
    }),
  );
};

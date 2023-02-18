export const deleteNote = (favoriteNews, setFavoriteNews, id) => {
    setFavoriteNews(
        favoriteNews.map((currentFavoriteNews) => {
            if (currentFavoriteNews.notes) {
                Object.keys(currentFavoriteNews.notes).forEach((targetPart) => {
                    currentFavoriteNews.notes[targetPart] =
                        currentFavoriteNews.notes[targetPart].filter((note) => {
                            return note.noteId !== id;
                        });
                });
                return currentFavoriteNews;
            } else {
                return currentFavoriteNews;
            }
        })
    );
};

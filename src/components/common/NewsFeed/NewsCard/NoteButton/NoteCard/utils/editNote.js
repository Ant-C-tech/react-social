export const editNote = (
    favoriteNews,
    setFavoriteNews,
    id,
    updatedNoteText
) => {
    setFavoriteNews(
        favoriteNews.map((currentFavoriteNews) => {
            if (currentFavoriteNews.notes) {
                Object.keys(currentFavoriteNews.notes).forEach((targetPart) => {
                    currentFavoriteNews.notes[targetPart] =
                        currentFavoriteNews.notes[targetPart].map((note) => {
                            if (note.noteId === id) {
                                note.noteText = updatedNoteText;
                                return note;
                            } else {
                                return note;
                            }
                        });
                });
                return currentFavoriteNews;
            } else {
                return currentFavoriteNews;
            }
        })
    );
};

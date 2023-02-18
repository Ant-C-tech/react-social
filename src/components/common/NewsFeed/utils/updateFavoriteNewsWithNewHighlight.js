import { addNewHighlightToArrayOfHighlights } from "./";

export const updateFavoriteNewsWithNewHighlight = (
    favoriteNews,
    setFavoriteNews,
    indexOfTargetNews,
    targetPart,
    newHighlight
) => {
    setFavoriteNews(
        favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
            if (currentFavoriteNewsIndex === indexOfTargetNews) {
                !currentFavoriteNews.highlights &&
                    (currentFavoriteNews["highlights"] = {});
                !currentFavoriteNews.highlights[targetPart] &&
                    (currentFavoriteNews.highlights[targetPart] = []);

                currentFavoriteNews.highlights[targetPart] =
                    addNewHighlightToArrayOfHighlights(
                        currentFavoriteNews.highlights[targetPart],
                        newHighlight
                    );
                return currentFavoriteNews;
            } else {
                return currentFavoriteNews;
            }
        })
    );
};

import { getUpdatedArrayOfHighlights } from '../NewsCard/utils/getUpdatedArrayOfHighlights';
import { getIndexOfTargetNews } from './getIndexOfTargetNews';

export const addHighlight = (
  favoriteNews,
  setFavoriteNews,
  activeTool,
  keywords,
  link,
  targetPart,
) => {
  const indexOfTargetNews = getIndexOfTargetNews(favoriteNews, link);

  if (window.getSelection().toString().length > 0 && activeTool) {
    let onMouseDownTargetText;
    if (
      (favoriteNews[indexOfTargetNews].highlights &&
        favoriteNews[indexOfTargetNews].highlights[targetPart]) ||
      keywords[0].length > 0
    ) {
      onMouseDownTargetText =
        window.getSelection().anchorNode.parentElement.textContent;
    } else {
      onMouseDownTargetText = window.getSelection().baseNode.textContent;
    }
    const onMouseUpTargetText = window.getSelection().focusNode.textContent;

    const startSelection = window.getSelection().anchorOffset;
    const endSelection = window.getSelection().focusOffset;

    let startIndex;
    let endIndex;

    if (
      (favoriteNews[indexOfTargetNews].highlights &&
        favoriteNews[indexOfTargetNews].highlights[targetPart]) ||
      keywords[0].length > 0
    ) {
      const arrayOfChunks = Array.prototype.slice.call(
        window.getSelection().anchorNode.parentElement.parentElement.children,
      );

      let startIndexCounter = 0;
      let endIndexCounter = 0;
      let wasStartIndexFound = false;
      let wasEndIndexFound = false;

      arrayOfChunks.forEach((chunk) => {
        if (
          chunk.textContent !== onMouseDownTargetText &&
          chunk.textContent !== onMouseUpTargetText
        ) {
          startIndexCounter = !wasStartIndexFound
            ? startIndexCounter + chunk.textContent.length
            : startIndexCounter;
          endIndexCounter = !wasEndIndexFound
            ? endIndexCounter + chunk.textContent.length
            : endIndexCounter;
        }

        if (
          chunk.textContent === onMouseDownTargetText &&
          chunk.textContent === onMouseUpTargetText
        ) {
          startIndexCounter =
            startIndexCounter +
            (endSelection > startSelection ? startSelection : endSelection);
          endIndexCounter =
            endIndexCounter +
            (endSelection > startSelection ? endSelection : startSelection);
          wasStartIndexFound = true;
          wasEndIndexFound = true;
        }

        if (
          chunk.textContent === onMouseDownTargetText &&
          chunk.textContent !== onMouseUpTargetText
        ) {
          startIndexCounter = startIndexCounter + startSelection;
          endIndexCounter = !wasEndIndexFound
            ? endIndexCounter + chunk.textContent.length
            : endIndexCounter;
          wasStartIndexFound = true;
        }

        if (
          chunk.textContent !== onMouseDownTargetText &&
          chunk.textContent === onMouseUpTargetText
        ) {
          startIndexCounter = !wasStartIndexFound
            ? startIndexCounter + chunk.textContent.length
            : startIndexCounter;
          endIndexCounter = endIndexCounter + endSelection;
          wasEndIndexFound = true;
        }
      });
      startIndex =
        endIndexCounter > startIndexCounter
          ? startIndexCounter
          : endIndexCounter;
      endIndex =
        endIndexCounter > startIndexCounter
          ? endIndexCounter
          : startIndexCounter;
    } else {
      startIndex =
        startSelection < endSelection ? startSelection : endSelection;
      endIndex = startSelection < endSelection ? endSelection : startSelection;
    }

    const newHighlight = {
      highlighter: activeTool,
      startIndex: startIndex,
      endIndex: endIndex,
    };

    setFavoriteNews(
      favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
        if (currentFavoriteNewsIndex === indexOfTargetNews) {
          !currentFavoriteNews.highlights &&
            (currentFavoriteNews['highlights'] = {});
          !currentFavoriteNews.highlights[targetPart] &&
            (currentFavoriteNews.highlights[targetPart] = []);

          currentFavoriteNews.highlights[targetPart] =
            getUpdatedArrayOfHighlights(
              currentFavoriteNews.highlights[targetPart],
              newHighlight,
            );
          return currentFavoriteNews;
        } else {
          return currentFavoriteNews;
        }
      }),
    );
  }
};

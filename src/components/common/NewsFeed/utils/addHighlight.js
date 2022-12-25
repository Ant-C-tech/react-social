import uuid from 'react-uuid';
import { addNewHighlightToArrayOfHighlights } from '../NewsCard/utils/addNewHighlightToArrayOfHighlights';
import {
  getIndexOfTargetNews,
  getIsHighlightWithinTargetPart,
} from './';

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
    const onMouseDownTargetText = window.getSelection().anchorNode.textContent;
    const onMouseUpTargetText = window.getSelection().focusNode.textContent;

    const startSelection = window.getSelection().anchorOffset;
    const startSelectionId = window.getSelection().anchorNode.parentElement.id;
    const endSelection = window.getSelection().focusOffset;
    const endSelectionId = window.getSelection().focusNode.parentElement.id;

    let startIndex;
    let endIndex;

    const isHighlightWithinTargetPart = getIsHighlightWithinTargetPart(
      favoriteNews,
      indexOfTargetNews,
      targetPart,
      keywords,
    );

    if (isHighlightWithinTargetPart) {
      const arrayOfChunks = Array.prototype.slice.call(
        // Target part always have not more than one level of nested children
        window.getSelection().anchorNode.parentElement.parentElement.children,
      );

      let startIndexCounter = 0;
      let endIndexCounter = 0;
      let wasStartIndexFound = false;
      let wasEndIndexFound = false;

      const chunkNotMatchHandler = (chunk) => {
        startIndexCounter = !wasStartIndexFound
          ? startIndexCounter + chunk.textContent.length
          : startIndexCounter;
        endIndexCounter = !wasEndIndexFound
          ? endIndexCounter + chunk.textContent.length
          : endIndexCounter;
      };

      arrayOfChunks.forEach((chunk) => {
        // Selection did NOT START here, did NOT FINISH here
        if (
          chunk.textContent !== onMouseDownTargetText &&
          chunk.textContent !== onMouseUpTargetText
        ) {
          chunkNotMatchHandler(chunk);
        }

        // Selection STARTED here, FINISHED here
        if (
          chunk.textContent === onMouseDownTargetText &&
          chunk.textContent === onMouseUpTargetText
        ) {
          if (startSelectionId === chunk.id && endSelectionId === chunk.id) {
            startIndexCounter =
              startIndexCounter +
              (endSelection > startSelection ? startSelection : endSelection);
            endIndexCounter =
              endIndexCounter +
              (endSelection > startSelection ? endSelection : startSelection);
            wasStartIndexFound = true;
            wasEndIndexFound = true;
          } else {
            chunkNotMatchHandler(chunk);
          }
        }

        // Selection STARTED here, did NOT FINISH here
        if (
          chunk.textContent === onMouseDownTargetText &&
          chunk.textContent !== onMouseUpTargetText
        ) {
          if (startSelectionId === chunk.id) {
            startIndexCounter = startIndexCounter + startSelection;
            endIndexCounter = !wasEndIndexFound
              ? endIndexCounter + chunk.textContent.length
              : endIndexCounter;
            wasStartIndexFound = true;
          } else {
            chunkNotMatchHandler(chunk);
          }
        }

        // Selection did NOT START here, FINISHED here
        if (
          chunk.textContent !== onMouseDownTargetText &&
          chunk.textContent === onMouseUpTargetText
        ) {
          if (endSelectionId === chunk.id) {
            startIndexCounter = !wasStartIndexFound
              ? startIndexCounter + chunk.textContent.length
              : startIndexCounter;
            endIndexCounter = endIndexCounter + endSelection;
            wasEndIndexFound = true;
          } else {
            chunkNotMatchHandler(chunk);
          }
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
      id: uuid(),
    };

    setFavoriteNews(
      favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
        if (currentFavoriteNewsIndex === indexOfTargetNews) {
          !currentFavoriteNews.highlights &&
            (currentFavoriteNews['highlights'] = {});
          !currentFavoriteNews.highlights[targetPart] &&
            (currentFavoriteNews.highlights[targetPart] = []);

          currentFavoriteNews.highlights[targetPart] =
            addNewHighlightToArrayOfHighlights(
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

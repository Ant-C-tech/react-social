import uuid from 'react-uuid';
// import { addNewHighlightToArrayOfHighlights } from './addNewHighlightToArrayOfHighlights';
import {
  getArrayOfChunksOfTargetPart,
  getIndexOfTargetNews,
  getIsTargetPartAlreadyHighlighted,
  updateFavoriteNewsWithNewHighlight,
  getIsTargetPartAlreadyHasNotes,
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
    const startSelectionIndex = window.getSelection().anchorOffset;
    const startSelectionId = window.getSelection().anchorNode.parentElement.id;
    const endSelectionIndex = window.getSelection().focusOffset;
    const endSelectionId = window.getSelection().focusNode.parentElement.id;

    let startIndex;
    let endIndex;

    const isTargetPartAlreadyHighlighted = getIsTargetPartAlreadyHighlighted(
      favoriteNews,
      indexOfTargetNews,
      targetPart,
      keywords,
    );
    const isTargetPartAlreadyHasNotes = getIsTargetPartAlreadyHasNotes(
      favoriteNews,
      indexOfTargetNews,
      targetPart,
    );

    if (isTargetPartAlreadyHighlighted || isTargetPartAlreadyHasNotes) {
      const arrayOfChunksOfTargetPart = getArrayOfChunksOfTargetPart();

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

      arrayOfChunksOfTargetPart.forEach((chunk) => {
        // Selection did NOT START here, did NOT FINISH here
        if (startSelectionId !== chunk.id && endSelectionId !== chunk.id) {
          chunkNotMatchHandler(chunk);
        }

        // Selection STARTED here, FINISHED here
        if (startSelectionId === chunk.id && endSelectionId === chunk.id) {
          startIndexCounter =
            startIndexCounter +
            (endSelectionIndex > startSelectionIndex
              ? startSelectionIndex
              : endSelectionIndex);
          endIndexCounter =
            endIndexCounter +
            (endSelectionIndex > startSelectionIndex
              ? endSelectionIndex
              : startSelectionIndex);
          wasStartIndexFound = true;
          wasEndIndexFound = true;
        }

        // Selection STARTED here, did NOT FINISH here
        if (startSelectionId === chunk.id && endSelectionId !== chunk.id) {
          startIndexCounter = startIndexCounter + startSelectionIndex;
          endIndexCounter = !wasEndIndexFound
            ? endIndexCounter + chunk.textContent.length
            : endIndexCounter;
          wasStartIndexFound = true;
        }

        // Selection did NOT START here, FINISHED here
        if (startSelectionId !== chunk.id && endSelectionId === chunk.id) {
          startIndexCounter = !wasStartIndexFound
            ? startIndexCounter + chunk.textContent.length
            : startIndexCounter;
          endIndexCounter = endIndexCounter + endSelectionIndex;
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
        startSelectionIndex < endSelectionIndex
          ? startSelectionIndex
          : endSelectionIndex;
      endIndex =
        startSelectionIndex < endSelectionIndex
          ? endSelectionIndex
          : startSelectionIndex;
    }

    const newHighlight = {
      highlighter: activeTool,
      startIndex: startIndex,
      endIndex: endIndex,
      id: uuid(),
    };

    // Update newHighlight if it covers already existing notes
    if (isTargetPartAlreadyHasNotes) {
      const notesOfTargetPart =
        favoriteNews[indexOfTargetNews].notes[targetPart];
      const notesWithinNewHighlight = notesOfTargetPart.filter((note) => {
        return (
          note.noteIndex >= newHighlight.startIndex &&
          note.noteIndex <= newHighlight.endIndex
        );
      });

      const arrayOfNewHighlights = [];
      let indexCounter = newHighlight.startIndex;

      notesWithinNewHighlight.forEach((note, index) => {
        arrayOfNewHighlights.push({
          highlighter: newHighlight.highlighter,
          startIndex: indexCounter,
          endIndex: note.noteIndex,
          id: uuid(),
        });
        indexCounter = note.noteIndex;
        if (index === notesWithinNewHighlight.length - 1) {
          arrayOfNewHighlights.push({
            highlighter: newHighlight.highlighter,
            startIndex: note.noteIndex,
            endIndex: newHighlight.endIndex,
            id: uuid(),
          });
        }
      });

      arrayOfNewHighlights.forEach((newHighlightFromArrayOfNewHighlights) => {
        updateFavoriteNewsWithNewHighlight(
          favoriteNews,
          setFavoriteNews,
          indexOfTargetNews,
          targetPart,
          newHighlightFromArrayOfNewHighlights,
        );
      });
    } else {
      updateFavoriteNewsWithNewHighlight(
        favoriteNews,
        setFavoriteNews,
        indexOfTargetNews,
        targetPart,
        newHighlight,
      );
    }

    // setFavoriteNews(
    //   favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
    //     if (currentFavoriteNewsIndex === indexOfTargetNews) {
    //       !currentFavoriteNews.highlights &&
    //         (currentFavoriteNews['highlights'] = {});
    //       !currentFavoriteNews.highlights[targetPart] &&
    //         (currentFavoriteNews.highlights[targetPart] = []);

    //       currentFavoriteNews.highlights[targetPart] =
    //         addNewHighlightToArrayOfHighlights(
    //           currentFavoriteNews.highlights[targetPart],
    //           newHighlight,
    //         );
    //       return currentFavoriteNews;
    //     } else {
    //       return currentFavoriteNews;
    //     }
    //   }),
    // );
  }
};

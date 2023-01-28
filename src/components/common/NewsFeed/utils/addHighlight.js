import uuid from 'react-uuid';
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
    const isSelectionEndsOnNote =
      window.getSelection().focusNode.classList &&
      window.getSelection().focusNode.classList[0] &&
      window.getSelection().focusNode.classList[0] === 'note';

    let startIndex;
    let endIndex;

    const startSelectionIndex = window.getSelection().anchorOffset;
    const startSelectionId = window.getSelection().anchorNode.parentElement.id;
    const endSelectionIndex = window.getSelection().focusOffset;
    const endSelectionId = window.getSelection().focusNode.parentElement.id;

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
      let wasStartIndexFound = false;

      //First Case - Selection ends on note
      if (isSelectionEndsOnNote) {
        const endSelectionNoteId = window.getSelection().focusNode.id;
        let endSelectionNoteIndex;
        favoriteNews[indexOfTargetNews].notes[targetPart].forEach((note) => {
          if (note.noteId === endSelectionNoteId) {
            endSelectionNoteIndex = note.noteIndex;
          }
        });

        arrayOfChunksOfTargetPart.forEach((chunk) => {
          // Selection did NOT START here
          if (startSelectionId !== chunk.id) {
            startIndexCounter = !wasStartIndexFound
              ? startIndexCounter + chunk.textContent.length
              : startIndexCounter;
          }

          // Selection STARTED here
          if (startSelectionId === chunk.id) {
            startIndexCounter = startIndexCounter + startSelectionIndex;
            wasStartIndexFound = true;
          }
        });

        startIndex =
          endSelectionNoteIndex > startIndexCounter
            ? startIndexCounter
            : endSelectionNoteIndex;
        endIndex =
          endSelectionNoteIndex > startIndexCounter
            ? endSelectionNoteIndex
            : startIndexCounter;
      } else {
        //Second Case - Selection didn't end on note
        let endIndexCounter = 0;
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
      }
    } else {
      //No highlights and notes on this part of the news
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

    updateFavoriteNewsWithNewHighlight(
      favoriteNews,
      setFavoriteNews,
      indexOfTargetNews,
      targetPart,
      newHighlight,
    );
  }
};

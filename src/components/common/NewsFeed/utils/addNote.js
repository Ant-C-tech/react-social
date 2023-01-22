import uuid from 'react-uuid';
import {
  getArrayOfChunksOfTargetPart,
  getIndexOfTargetNews,
  getIsTargetPartAlreadyHighlighted,
  // addNewHighlightToArrayOfHighlights,
  updateFavoriteNewsWithNewHighlight,
  getIsTargetPartAlreadyHasNotes,
} from './';

const getCorrection = (noteIndexInParent, text) => {
  const isNoteIndexNeedCorrection =
    noteIndexInParent !== text.length &&
    noteIndexInParent !== 0 &&
    text[noteIndexInParent] !== ' ';

  const isNoteWithinLastWord =
    text
      .split('')
      .splice(noteIndexInParent, text.split('').length - 1)
      .indexOf(' ') === -1;

  const correction =
    isNoteIndexNeedCorrection && !isNoteWithinLastWord
      ? text
          .split('')
          .splice(noteIndexInParent, text.split('').length - 1)
          .indexOf(' ')
      : isNoteIndexNeedCorrection && isNoteWithinLastWord
      ? text.length - noteIndexInParent
      : 0;

  return correction;
};

export const addNote = (
  favoriteNews,
  setFavoriteNews,
  keywords,
  link,
  targetPart,
) => {
  const indexOfTargetNews = getIndexOfTargetNews(favoriteNews, link);
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

  const noteIndexInParent = window.getSelection().anchorOffset;
  // const noteParentText = window.getSelection().anchorNode.textContent;

  let noteIndex;

  if (isTargetPartAlreadyHighlighted || isTargetPartAlreadyHasNotes) {
    const arrayOfChunksOfTargetPart = getArrayOfChunksOfTargetPart();

    const parentId = window.getSelection().anchorNode.parentElement.id;

    let noteIndexCounter = 0;
    let wasNoteIndexFound = false;

    const chunkNotMatchHandler = (chunk) => {
      noteIndexCounter = !wasNoteIndexFound
        ? noteIndexCounter + chunk.textContent.length
        : noteIndexCounter;
    };

    arrayOfChunksOfTargetPart.forEach((chunk) => {
      if (parentId === chunk.id) {
        const correction = getCorrection(noteIndexInParent, chunk.textContent);
        noteIndexCounter = noteIndexCounter + noteIndexInParent + correction;
        wasNoteIndexFound = true;
      } else {
        chunkNotMatchHandler(chunk);
      }
    });
    noteIndex = noteIndexCounter;
  } else {
    const text = favoriteNews[indexOfTargetNews][targetPart];
    const correction = getCorrection(noteIndexInParent, text);
    noteIndex = noteIndexInParent + correction;
  }

  const newNote = {
    noteIndex: noteIndex,
    noteId: uuid(),
  };

  // ADD AFTER HANDLING NOTES FOR HIGHLIGHTS
  // const highlightsOfTargetPart =
  //   favoriteNews[indexOfTargetNews].highlights[targetPart];
  // highlightsOfTargetPart.forEach((highlight) => {
  //   if (
  //     highlight.startIndex < newNote.noteIndex &&
  //     highlight.endIndex > newNote.noteIndex
  //   ) {
  //     [
  //       {
  //         highlighter: highlight.highlighter,
  //         startIndex: highlight.startIndex,
  //         endIndex: newNote.noteIndex,
  //         id: uuid(),
  //       },
  //       {
  //         highlighter: highlight.highlighter,
  //         startIndex: newNote.noteIndex,
  //         endIndex: highlight.endIndex,
  //         id: uuid(),
  //       },
  //     ].forEach((newHighlight) => {
  //       updateFavoriteNewsWithNewHighlight(
  //         favoriteNews,
  //         setFavoriteNews,
  //         indexOfTargetNews,
  //         targetPart,
  //         newHighlight,
  //       );
  //     });
  //   }
  // });

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

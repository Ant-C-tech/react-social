import uuid from 'react-uuid';
import { getIndexOfTargetNews, getIsHighlightWithinTargetPart } from './';

export const addNote = (
  favoriteNews,
  setFavoriteNews,
  keywords,
  link,
  targetPart,
) => {
  const indexOfTargetNews = getIndexOfTargetNews(favoriteNews, link);
  const isHighlightWithinTargetPart = getIsHighlightWithinTargetPart(
    favoriteNews,
    indexOfTargetNews,
    targetPart,
    keywords,
  );
  const noteIndexInParent = window.getSelection().anchorOffset;
  const noteParentText = window.getSelection().anchorNode.textContent;
  console.log('noteParentText', noteParentText);

  let noteIndex;

  if (isHighlightWithinTargetPart) {
    const arrayOfChunks = Array.prototype.slice.call(
      // Target part always have not more than one level of nested children
      window.getSelection().anchorNode.parentElement.parentElement.children,
    );

    const parentId = window.getSelection().anchorNode.parentElement.id;

    let noteIndexCounter = 0;
    let wasNoteIndexFound = false;

    const chunkNotMatchHandler = (chunk) => {
      noteIndexCounter = !wasNoteIndexFound
        ? noteIndexCounter + chunk.textContent.length
        : noteIndexCounter;
    };

    arrayOfChunks.forEach((chunk) => {
      const text = chunk.textContent;

      if (parentId === chunk.id) {
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

        noteIndexCounter = noteIndexCounter + noteIndexInParent + correction;
        wasNoteIndexFound = true;
      } else {
        chunkNotMatchHandler(chunk);
      }
    });
    noteIndex = noteIndexCounter;
  } else {
    noteIndex = noteIndexInParent;
  }

  const newNote = {
    noteIndex: noteIndex,
    noteId: uuid(),
  };

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

import {
  getIndexOfTargetNews,
  getIsHighlightWithinTargetPart,
  // getOnMouseDownTargetText
} from './';

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

  let noteIndex;

  if (isHighlightWithinTargetPart) {
    const arrayOfChunks = Array.prototype.slice.call(
      // Target part always have not more than one level of nested children
      window.getSelection().anchorNode.parentElement.parentElement.children,
    );
    const onMouseDownTargetText = window.getSelection().anchorNode.textContent;

    const parentId = window.getSelection().anchorNode.parentElement.id;

    let noteIndexCounter = 0;
    let wasNoteIndexFound = false;

    const chunkNotMatchHandler = (chunk) => {
      noteIndexCounter = !wasNoteIndexFound
        ? noteIndexCounter + chunk.textContent.length
        : noteIndexCounter;
    };

    arrayOfChunks.forEach((chunk) => {
      if (chunk.textContent !== onMouseDownTargetText) {
        // If note should be not within this chunk
        chunkNotMatchHandler(chunk);
      } else {
        if (parentId === chunk.id) {
          // Double check if we have several highlights with exactly the same text
          noteIndexCounter = noteIndexCounter + noteIndexInParent;
          wasNoteIndexFound = true;
        } else {
          chunkNotMatchHandler(chunk);
        }
      }
    });
    noteIndex = noteIndexCounter;
  } else {
    noteIndex = noteIndexInParent;
  }

  const newNote = {
    noteIndex: noteIndex,
  };

  setFavoriteNews(
    favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
      if (currentFavoriteNewsIndex === indexOfTargetNews) {
        !currentFavoriteNews.notes &&
          (currentFavoriteNews['notes'] = {});
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

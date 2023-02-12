export const getIsTargetPartAlreadyHasNotes = (
  favoriteNews,
  indexOfTargetNews,
  targetPart,
) => {
  const isNotesWithinTargetPart =
    favoriteNews[indexOfTargetNews].notes &&
    favoriteNews[indexOfTargetNews].notes[targetPart];
  return isNotesWithinTargetPart;
};

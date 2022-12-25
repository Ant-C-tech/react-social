export const getIsHighlightWithinTargetPart = (favoriteNews, indexOfTargetNews,targetPart, keywords ) => {
  const isHighlightWithinTargetPart =
    (favoriteNews[indexOfTargetNews].highlights &&
      favoriteNews[indexOfTargetNews].highlights[targetPart]) ||
    keywords[0].length > 0;
  return isHighlightWithinTargetPart;
};

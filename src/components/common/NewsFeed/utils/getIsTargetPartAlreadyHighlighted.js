export const getIsTargetPartAlreadyHighlighted = (
    favoriteNews,
    indexOfTargetNews,
    targetPart,
    keywords
) => {
    const isHighlightsWithinTargetPart =
        (favoriteNews[indexOfTargetNews].highlights &&
            favoriteNews[indexOfTargetNews].highlights[targetPart]) ||
        keywords[0].length > 0;
    return isHighlightsWithinTargetPart;
};

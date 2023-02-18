export const addNewHighlightToArrayOfHighlights = (
    highlights,
    newHighlight
) => {
    const additionalHighlight = {};

    const updatedArrayOfHighlights = highlights
        .filter((highlight) => {
            if (
                highlight.startIndex < newHighlight.startIndex ||
                highlight.endIndex > newHighlight.endIndex
            ) {
                return highlight;
            } else {
                return false;
            }
        })
        .map((highlight) => {
            if (
                highlight.startIndex <= newHighlight.startIndex &&
                highlight.endIndex > newHighlight.startIndex &&
                highlight.endIndex <= newHighlight.endIndex
            ) {
                highlight.endIndex = newHighlight.startIndex;
            }
            if (
                highlight.startIndex >= newHighlight.startIndex &&
                highlight.startIndex < newHighlight.endIndex &&
                highlight.endIndex >= newHighlight.endIndex
            ) {
                highlight.startIndex = newHighlight.endIndex;
            }
            if (
                highlight.startIndex < newHighlight.startIndex &&
                highlight.endIndex > newHighlight.endIndex
            ) {
                additionalHighlight["highlighter"] = highlight.highlighter;
                additionalHighlight["startIndex"] =
                    newHighlight.startIndex < newHighlight.endIndex
                        ? newHighlight.endIndex
                        : newHighlight.startIndex;
                additionalHighlight["endIndex"] =
                    highlight.startIndex < highlight.endIndex
                        ? highlight.endIndex
                        : highlight.startIndex;

                highlight.endIndex = newHighlight.startIndex;
            }
            return highlight;
        });

    if (Object.keys(additionalHighlight).length > 0) {
        updatedArrayOfHighlights.push(additionalHighlight);
    }
    updatedArrayOfHighlights.push(newHighlight);

    return updatedArrayOfHighlights;
};

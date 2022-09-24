import uuid from 'react-uuid';

export const getHighlightedStructure = (initialText, highlights, keywords) => {
  const highlightsWithSearch = [];

  if (keywords[0].length > 0) {
    let searchCounter = 0;
    let isMatch = true;

    const searchHighlights = [];

    while (isMatch) {
      const searchHighlight = {
        highlighter: 'search-highlight',
        startIndex: 0,
        endIndex: 0,
      };

      const firstMatch = initialText
        .split('')
        .slice(searchCounter)
        .join('')
        .search(keywords);

      switch (firstMatch) {
        case -1:
          isMatch = false;
          break;

        default:
          searchCounter = firstMatch + keywords[0].length;
          searchHighlight.startIndex = firstMatch;
          searchHighlight.endIndex = firstMatch + keywords[0].length;
          break;
      }

      if (searchHighlight.endIndex !== 0) {
        searchHighlights.push(searchHighlight);
      }
    }

    if (searchHighlights.length > 0) {
      searchHighlights.forEach((highlight) => {
        highlightsWithSearch.push(highlight);
      });
    }
  }

  if (highlights) {
    highlights.forEach((highlight) => {
      highlightsWithSearch.push(highlight);
    });
	}

	console.log(highlightsWithSearch);

  if (highlightsWithSearch.length > 0) {
    const sortedDescriptionHighlights = highlightsWithSearch.sort(
      (highlight1, highlight2) => {
        return highlight1.startIndex - highlight2.startIndex;
      },
    );

    let highlightedStructure = [];
    const initialDescriptionArray = initialText.split('');

    let endOfPrevHighlightForParsing = 0;
    sortedDescriptionHighlights.forEach((highlight, index) => {
      if (highlight.startIndex === 0) {
        highlightedStructure.push(
          <span className={highlight.highlighter} key={uuid()}>
            {initialDescriptionArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      } else if (
        highlight.startIndex !== 0 &&
        highlight.startIndex !== endOfPrevHighlightForParsing
      ) {
        highlightedStructure.push(
          <span key={uuid()}>
            {initialDescriptionArray
              .slice(endOfPrevHighlightForParsing, highlight.startIndex)
              .join('')}
          </span>,
        );
        highlightedStructure.push(
          <span className={highlight.highlighter} key={uuid()}>
            {initialDescriptionArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      } else {
        highlightedStructure.push(
          <span className={highlight.highlighter} key={uuid()}>
            {initialDescriptionArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      }
      if (
        index === sortedDescriptionHighlights.length - 1 &&
        highlight.endIndex !== initialDescriptionArray.length
      ) {
        highlightedStructure.push(
          <span key={uuid()}>
            {initialDescriptionArray
              .slice(highlight.endIndex, initialDescriptionArray.length)
              .join('')}
          </span>,
        );
      }
    });
    return highlightedStructure;
  } else {
    return initialText;
  }
};

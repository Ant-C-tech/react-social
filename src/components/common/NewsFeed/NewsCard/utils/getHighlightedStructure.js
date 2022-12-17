import uuid from 'react-uuid';
import { getUpdatedArrayOfHighlights } from './getUpdatedArrayOfHighlights';

export const getHighlightedStructure = (initialText, highlights, keywords) => {
  let highlightsWithSearch = [];
  const searchHighlights = [];

  if (keywords[0].length > 0) {
    let searchCounter = 0;
    let isMatch = true;

    while (isMatch) {
      const searchHighlight = {
        highlighter: 'search-highlight',
        startIndex: 0,
        endIndex: 0,
      };

      const firstMatch = initialText
        .toLowerCase()
        .split('')
        .slice(searchCounter)
        .join('')
        .search(keywords[0].toLowerCase());

      switch (firstMatch) {
        case -1:
          isMatch = false;
          break;

        default:
          searchHighlight.startIndex = firstMatch + searchCounter;
          searchHighlight.endIndex =
            firstMatch + keywords[0].length + searchCounter;

          searchCounter = searchHighlight.endIndex;
          break;
      }

      if (searchHighlight.endIndex !== 0) {
        searchHighlights.push(searchHighlight);
      }
    }
  }

  if (highlights) {
    highlightsWithSearch = JSON.parse(JSON.stringify(highlights));

    if (searchHighlights.length > 0) {
      searchHighlights.forEach((searchHighlight) => {
        highlightsWithSearch = getUpdatedArrayOfHighlights(
          highlightsWithSearch,
          searchHighlight,
        );
      });
    }
  } else {
    if (searchHighlights.length > 0) {
      searchHighlights.forEach((searchHighlight) => {
        highlightsWithSearch.push(searchHighlight);
      });
    }
  }

  if (highlightsWithSearch.length > 0) {
    const sortedHighlights = highlightsWithSearch.sort(
      (highlight1, highlight2) => {
        return highlight1.startIndex - highlight2.startIndex;
      },
    );

    let highlightedStructure = [];
    const initialArray = initialText.split('');

    let endOfPrevHighlightForParsing = 0;
    sortedHighlights.forEach((highlight, index) => {
      if (highlight.startIndex === 0) {
        highlightedStructure.push(
          <span
            id={highlight.id}
            className={highlight.highlighter}
            key={uuid()}
          >
            {initialArray
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
          <span id={uuid()} key={uuid()}>
            {initialArray
              .slice(endOfPrevHighlightForParsing, highlight.startIndex)
              .join('')}
          </span>,
        );
        highlightedStructure.push(
          <span
            id={highlight.id}
            className={highlight.highlighter}
            key={uuid()}
          >
            {initialArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      } else {
        highlightedStructure.push(
          <span
            className={highlight.highlighter}
            id={highlight.id}
            key={uuid()}
          >
            {initialArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      }
      if (
        index === sortedHighlights.length - 1 &&
        highlight.endIndex !== initialArray.length
      ) {
        highlightedStructure.push(
          <span id={uuid()} key={uuid()}>
            {initialArray
              .slice(highlight.endIndex, initialArray.length)
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

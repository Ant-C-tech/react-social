import uuid from 'react-uuid';
import { getUpdatedArrayOfHighlights } from './getUpdatedArrayOfHighlights';

export const getHighlightedStructure = (initialText, highlights, keywords) => {
  let highlightsWithSearch = [];
  const searchHighlights = [];

  if (keywords[0].length > 0) {
    let searchCounter = 0;
    let isMatch = true;

    console.log(initialText);

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

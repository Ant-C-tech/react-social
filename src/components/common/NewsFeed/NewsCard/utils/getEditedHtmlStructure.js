import uuid from 'react-uuid';
import {
  addNewHighlightToArrayOfHighlights,
  getHtmlStructureWithNotes,
  getSearchResults,
} from './';

export const getEditedHtmlStructure = (
  initialText,
  highlights,
  notes,
  keywords,
) => {
  let highlightsAndSearchResults = [];
  const searchResults =
    keywords[0].length > 0 ? getSearchResults(initialText, keywords) : null;

  // Get array of highlights
  if (highlights && searchResults) {
    highlightsAndSearchResults = JSON.parse(JSON.stringify(highlights));
    searchResults.forEach((searchResult) => {
      highlightsAndSearchResults = addNewHighlightToArrayOfHighlights(
        highlightsAndSearchResults,
        searchResult,
      );
    });
  } else if (highlights) {
    highlightsAndSearchResults = JSON.parse(JSON.stringify(highlights));
  } else if (searchResults) {
    searchResults.forEach((searchResult) => {
      highlightsAndSearchResults.push(searchResult);
    });
  }

  // Get edited HTML structure
  let editedHtmlStructure = [];
  let endOfPrevHighlightForParsing = 0;
  const initialTextArray = initialText.split('');

  if (highlightsAndSearchResults.length > 0) {
    const sortedHighlights = highlightsAndSearchResults.sort(
      (highlight1, highlight2) => {
        return highlight1.startIndex - highlight2.startIndex;
      },
    );

    sortedHighlights.forEach((highlight, index) => {
      if (highlight.startIndex === 0) {
        editedHtmlStructure.push(
          <span
            id={highlight.id}
            className={highlight.highlighter}
            key={uuid()}
          >
            {notes
              ? getHtmlStructureWithNotes(
                  highlight.startIndex,
                  highlight.endIndex,
                  initialTextArray
                    .slice(highlight.startIndex, highlight.endIndex)
                    .join(''),
                  notes,
                ).map((nodeElement) => nodeElement)
              : initialTextArray
                  .slice(highlight.startIndex, highlight.endIndex)
                  .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      } else if (
        highlight.startIndex !== 0 &&
        highlight.startIndex !== endOfPrevHighlightForParsing
      ) {
        editedHtmlStructure.push(
          <span id={uuid()} key={uuid()}>
            {initialTextArray
              .slice(endOfPrevHighlightForParsing, highlight.startIndex)
              .join('')}
          </span>,
        );
        editedHtmlStructure.push(
          <span
            id={highlight.id}
            className={highlight.highlighter}
            key={uuid()}
          >
            {initialTextArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      } else {
        editedHtmlStructure.push(
          <span
            className={highlight.highlighter}
            id={highlight.id}
            key={uuid()}
          >
            {initialTextArray
              .slice(highlight.startIndex, highlight.endIndex)
              .join('')}
          </span>,
        );
        endOfPrevHighlightForParsing = highlight.endIndex;
      }
      if (
        index === sortedHighlights.length - 1 &&
        highlight.endIndex !== initialTextArray.length
      ) {
        editedHtmlStructure.push(
          <span id={uuid()} key={uuid()}>
            {initialTextArray
              .slice(highlight.endIndex, initialTextArray.length)
              .join('')}
          </span>,
        );
      }
    });

    return editedHtmlStructure;
  } else {
    return initialText;
  }
};

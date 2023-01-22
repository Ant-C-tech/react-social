import uuid from 'react-uuid';
import { addNewHighlightToArrayOfHighlights } from '../../utils';
import { getHtmlStructureWithNotes, getSearchResults } from './';

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
        //Highlight starts from beginning of text
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
      } else if (
        highlight.startIndex !== 0 &&
        highlight.startIndex !== endOfPrevHighlightForParsing
      ) {
        //Highlight starts NOT from beginning of text and NOT from beginning of previous highlight
        editedHtmlStructure.push(
          getHtmlStructureWithNotes(
            notes,
            initialTextArray,
            endOfPrevHighlightForParsing,
            highlight.startIndex,
          ),
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
        //Highlight starts from beginning of previous highlight
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

      // ADDING NOTES INSIDE THE HIGHLIGHTS
      // notes &&
      //   notes.forEach((note) => {
      //     if (note.noteIndex === endOfPrevHighlightForParsing) {
      //       editedHtmlStructure.push(
      //         <button
      //           className='note'
      //           id={note.noteId}
      //           key={note.noteId}
      //         ></button>,
      //       );
      //     }
      //   });

      // if it is the last highlight
      if (
        index === sortedHighlights.length - 1 &&
        highlight.endIndex !== initialTextArray.length
      ) {
        editedHtmlStructure.push(
          getHtmlStructureWithNotes(
            notes,
            initialTextArray,
            highlight.endIndex,
            initialTextArray.length,
          ),
        );
      }
    });

    return editedHtmlStructure;
  } else {
    return [
      getHtmlStructureWithNotes(
        notes,
        initialTextArray,
        0,
        initialTextArray.length,
      ),
      // <span id={uuid()} key={uuid()}>
      //   {initialText}
      // </span>,
    ];
  }
};

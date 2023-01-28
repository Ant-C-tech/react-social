import uuid from 'react-uuid';

export const getHtmlStructureWithNotes = (
  notes,
  initialTextArray,
  startIndex,
  endIndex,
  highlighter = null,
) => {
  const htmlStructureArray = [];
  let indexCounter = startIndex;

  if (notes) {
    const notesWithinThisChunk = notes
      .sort((note1, note2) => {
        return note1.noteIndex - note2.noteIndex;
      })
      .filter((note) => {
        return note.noteIndex > startIndex && note.noteIndex <= endIndex;
      });

    notesWithinThisChunk.length !== 0 &&
      notesWithinThisChunk.forEach((note, index) => {
        htmlStructureArray.push(
          <span id={uuid()} key={uuid()} className={highlighter && highlighter}>
            {initialTextArray.slice(indexCounter, note.noteIndex).join('')}
          </span>,
        );
        htmlStructureArray.push(
          <button id={note.noteId} key={note.noteId} className='note'></button>,
        );
        indexCounter = note.noteIndex;

        if (
          index === notesWithinThisChunk.length - 1 &&
          indexCounter !== endIndex
        ) {
          htmlStructureArray.push(
            <span
              id={uuid()}
              key={uuid()}
              className={highlighter && highlighter}
            >
              {initialTextArray.slice(indexCounter, endIndex).join('')}
            </span>,
          );
        }
      });
  }

  if (htmlStructureArray.length === 0 || notes.length === 0) {
    htmlStructureArray.push(
      <span id={uuid()} key={uuid()} className={highlighter && highlighter}>
        {initialTextArray.slice(startIndex, endIndex).join('')}
      </span>,
    );
  }

  return htmlStructureArray;
};

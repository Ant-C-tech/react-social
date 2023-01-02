import React from 'react';

export const getHtmlStructureWithNotes = (
  startIndex,
  endIndex,
  text,
  notes,
) => {
  const notesWithinChunk = notes.filter((note) => {
    return note.noteIndex > startIndex && note.noteIndex < endIndex;
  });
  const htmlStructureArray = [];

  notesWithinChunk.forEach((note, index) => {
    let chunkStartIndex = 0;
    const noteUpdatedIndex =
      note.noteIndex +
      text
        .split('')
        .splice(note.noteIndex, text.split('').length - 1)
        .indexOf(' ');

    htmlStructureArray.push(
      <React.Fragment key={`PrevText${index}`}>
        {text.split('').splice(chunkStartIndex, noteUpdatedIndex).join('')}
      </React.Fragment>,
    );

    htmlStructureArray.push(<button className='note' key={index}></button>);

    chunkStartIndex = noteUpdatedIndex;
    if (index === notesWithinChunk.length - 1) {
      htmlStructureArray.push(
        <React.Fragment key={`AfterText${index}`}>
          {text
            .split('')
            .splice(chunkStartIndex, text.split('').length - 1)
            .join('')}
        </React.Fragment>,
      );
    }
  });

  return htmlStructureArray;
};

import React from 'react';
import uuid from 'react-uuid';

export const getHtmlStructureWithNotes = (
  startIndex,
  endIndex,
  text,
  notes,
) => {
  if (notes) {
    const notesWithinChunk = notes
      .filter((note) => {
        return note.noteIndex > startIndex && note.noteIndex <= endIndex;
      })
      .sort((note1, note2) => {
        return note1.noteIndex - note2.noteIndex;
      });

    const htmlStructureArray = [];
    let chunkStartIndex = 0;

    notesWithinChunk.forEach((note, index) => {
      htmlStructureArray.push(
        <React.Fragment key={`PrevText-${note.noteId}`}>
          {text
            .split('')
            .splice(chunkStartIndex, note.noteIndex - chunkStartIndex)
            .join('')}
        </React.Fragment>,
      );

      htmlStructureArray.push(
        <button className='note' key={note.noteId}></button>,
      );

      chunkStartIndex = note.noteIndex;

      if (index === notesWithinChunk.length - 1) {
        htmlStructureArray.push(
          <React.Fragment key={`AfterText-${note.noteId}`}>
            {text
              .split('')
              .splice(chunkStartIndex, text.split('').length - 1)
              .join('')}
          </React.Fragment>,
        );
      }
    });

    console.log('htmlStructureArray', htmlStructureArray);
    return htmlStructureArray;
  } else {
    return [<React.Fragment key={uuid()}>{text}</React.Fragment>];
  }
};

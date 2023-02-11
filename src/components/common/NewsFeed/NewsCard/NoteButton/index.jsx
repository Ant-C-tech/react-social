import './styles.css';
import { stickyNoteIcon } from '@assets';

import { useRef, useState } from 'react';
import { NoteCard } from './NoteCard';

export const NoteButton = ({ id, noteText, isOpen, onClick, newsCardRef }) => {
  const noteButtonRef = useRef();

  const [noteButtonActive, setNoteButtonActive] = useState(false);
  const [noteCardLeft, setNoteCardLeft] = useState(0);

  const getNoteCardPosition = () => {
    const noteCardWidth = 200;
    const noteButtonX = noteButtonRef.current.offsetLeft;
    const newsCardWidth = newsCardRef.current.offsetWidth;
    const distanceToRightBorder = newsCardWidth - noteButtonX;
    const noteCardLeft = distanceToRightBorder - noteCardWidth;
    setNoteCardLeft(noteCardLeft < 0 ? noteCardLeft : 0);
  };

  return (
    <button
      id={id}
      className={`button button-without-text note-button ${
        noteButtonActive ? 'button-active' : ''
      }`}
      ref={noteButtonRef}
      onClick={() => {
        onClick();
        setNoteButtonActive(true);
        getNoteCardPosition();
      }}
    >
      <img
        className='note-button-icon'
        src={stickyNoteIcon}
        alt='#'
        aria-hidden={true}
      />
      {isOpen && <NoteCard noteText={noteText} noteCardLeft={noteCardLeft} />}
    </button>
  );
};

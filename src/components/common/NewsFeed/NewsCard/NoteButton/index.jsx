import './styles.css';
import { stickyNoteIcon } from '@assets';

import { useRef, useState } from 'react';
import { NoteCard } from './NoteCard';

export const NoteButton = ({
  id,
  noteText,
  isOpen,
  setActiveTool,
  setOpenNoteId,
  newsCardRef,
  favoriteNews,
  setFavoriteNews,
}) => {
  const noteButtonRef = useRef();

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
    <span
      role='button'
      tabIndex={0}
      id={id}
      className={`button button-without-text note-button ${
        isOpen ? 'button-active' : ''
      }`}
      ref={noteButtonRef}
      onClick={() => {
        setActiveTool('');
        setOpenNoteId(id);
        getNoteCardPosition();
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          setActiveTool('');
          setOpenNoteId(id);
          getNoteCardPosition();
        } else if (event.key === 'Escape') {
          setOpenNoteId('');
        } else if (event.key === 'Tab') {
          event.stopPropagation();
          event.preventDefault();
        }
      }}
    >
      <img
        className='note-button-icon'
        src={stickyNoteIcon}
        alt='#'
        aria-hidden={true}
      />
      {isOpen && (
        <NoteCard
          noteText={noteText}
          noteCardLeft={noteCardLeft}
          favoriteNews={favoriteNews}
          setFavoriteNews={setFavoriteNews}
          id={id}
        />
      )}
    </span>
  );
};

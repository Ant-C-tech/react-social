import './styles.css';
import { stickyNoteIcon } from '@assets';

import { useState } from 'react';
import { NoteCard } from '../NoteCard';

export const NoteButton = ({ id, noteText, isOpen, onClick }) => {
  const [noteButtonActive, setNoteButtonActive] = useState(false);

  return (
    <button
      id={id}
      className={`button button-without-text note-button ${
        noteButtonActive ? 'button-active' : ''
      }`}
      onClick={() => {
        onClick();
        setNoteButtonActive(true);
      }}
    >
      <img
        className='note-button-icon'
        src={stickyNoteIcon}
        alt='#'
        aria-hidden={true}
      />
      {isOpen && <NoteCard noteText={noteText} />}
    </button>
  );
};

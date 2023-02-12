import './styles.css';

import { useEffect } from 'react';
import { TextArea } from '@common';

export const NoteCardTextArea = ({ text, setText }) => {
  useEffect(() => {
    const noteCard = document.querySelector('.text-area-field');
    noteCard.focus();
  }, []);

  return (
    <div className='note-card-textarea'>
      <TextArea text={text} setText={setText} rows={4} />
    </div>
  );
};

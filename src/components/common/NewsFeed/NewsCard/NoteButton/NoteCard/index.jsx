import './styles.css';

export const NoteCard = ({ noteText, noteCardLeft }) => {
  return (
    <dialog className='note-card' open style={{ left: noteCardLeft }}>
      {noteText}
    </dialog>
  );
};

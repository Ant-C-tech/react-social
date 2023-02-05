import './styles.css';

export const NoteCard = ({ noteText }) => {
  return <dialog className='note-card' open>{noteText}</dialog>;
};

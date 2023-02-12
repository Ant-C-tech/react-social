import './styles.css';

export const TextArea = ({ text, setText, rows=6, label,  }) => {
  return (
    <>
      <label className='text-area-label'>{label}</label>
      <textarea
        className='text-area-field'
        name='note text'
        rows={rows}
        cols={25}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </>
  );
};

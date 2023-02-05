import './styles.css';

export const TextArea = ({ text, setText, label }) => {
  return (
    <>
      <label className='text-area-label'>{label}</label>
      <textarea
        className='text-area-field'
        name='note text'
        rows={6}
        cols={25}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </>
  );
};

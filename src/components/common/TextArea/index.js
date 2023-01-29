import './styles.css';

export const TextArea = ({ text, setText }) => {
  return (
    <label className='text-area-label'>
      Create your note card and add it to the news:
      <textarea
        className='text-area-field'
        name='note text'
        rows={6}
        cols={25}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </label>
  );
};

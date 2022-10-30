import './styles.css';
import hintIcon from '@assets/knowledge.png';

export const Message = ({ type, title, children }) => {
  return (
    <article className={`${type} message`}>
      <h2 className='message-title'>{title}</h2>
      <img
        src={hintIcon}
        className='message-icon'
        alt='#'
        aria-hidden={true}
      />
      <div className='message-text'>{children}</div>
    </article>
  );
};

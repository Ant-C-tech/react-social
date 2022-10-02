import './index.css';

import { ErrorTwoTone } from '@material-ui/icons';

export const Message = ({ type, title, children }) => {
  return (
    <article className={`${type} message`}>
      <h2 className='message-title'>{title}</h2>
      <ErrorTwoTone fontSize='large' className='message-icon' />
      <div className='message-text'>{children}</div>
    </article>
  );
};

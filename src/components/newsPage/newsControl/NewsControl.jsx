import { Message } from '../../common/message/Message';
import './newsControl.css';

export const NewsControl = ({ message }) => {
  const isMessage = Object.keys(message).length

  return (
    <section className='news-control'>
      {isMessage && <Message type={message.type} title={message.title} text={message.text} />}
    </section>
  );
};

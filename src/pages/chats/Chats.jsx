import { Message } from '../../components/common/message/Message';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';

export const Chats = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'info'} title={'Chats'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const Videos = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'Videos'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

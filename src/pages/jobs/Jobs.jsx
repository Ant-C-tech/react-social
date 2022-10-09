import { Message } from '@common/Message/';
import { ControlBar } from '@sections/controlbar/ControlBar';

export const Jobs = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'Jobs'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

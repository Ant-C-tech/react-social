import { Message } from '@common/Message/';
import { ControlBar } from '@sections/controlbar/ControlBar';

export const Videos = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'info'} title={'Videos'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

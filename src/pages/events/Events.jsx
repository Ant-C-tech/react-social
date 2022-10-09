import { Message } from '@common/Message/';
import { ControlBar } from '@sections/controlbar/ControlBar';

export const Events = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'Events'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

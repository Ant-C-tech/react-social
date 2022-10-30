import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

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

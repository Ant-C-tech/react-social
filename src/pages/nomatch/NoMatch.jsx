import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const NoMatch = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-warning'} title={'This page does not exist'}>
          <p>Please, use the user interface for navigation.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

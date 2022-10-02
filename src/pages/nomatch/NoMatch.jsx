import { Message } from '@common/Message/';
import { ControlBar } from '@sections/controlbar/ControlBar';

export const NoMatch = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'warning'} title={'This page does not exist'}>
          <p>Please, use the user interface for navigation.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

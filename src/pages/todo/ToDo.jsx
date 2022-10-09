import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const ToDo = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'ToDo'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

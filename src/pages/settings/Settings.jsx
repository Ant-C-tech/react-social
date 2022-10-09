import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const Settings = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'Settings'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const Bookmarks = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'Bookmarks'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

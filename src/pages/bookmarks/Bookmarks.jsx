import { Message } from '@common/Message/';
import { ControlBar } from '@sections/controlbar/ControlBar';

export const Bookmarks = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'info'} title={'Bookmarks'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const SignUp = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'SignUp'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};

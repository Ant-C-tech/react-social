import { Message } from '../../components/common/message/Message';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';

export const LogIn = () => {
  return (<>
    <section className='content-container'>
      <Message type={'info'} title={'LogIn'}>
        <p>Sorry, this functionality is in development at the moment.</p>
      </Message>
    </section>
    <ControlBar />
  </>)
};

import { Message } from '../../components/common/message/Message';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';

export const Contact = () => {
  return (<>
    <section className='content-container'>
      <Message type={'info'} title={'Contact'}>
        <p>Sorry, this functionality is in development at the moment.</p>
      </Message>
    </section>
    <ControlBar />
  </>)
};

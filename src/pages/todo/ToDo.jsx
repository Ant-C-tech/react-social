import { Message } from '../../components/common/message/Message';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';

export const ToDo = () => {
  return (<>
    <section className='content-container'>
      <Message type={'info'} title={'ToDo'}>
        <p>Sorry, this functionality is in development at the moment.</p>
      </Message>
    </section>
    <ControlBar />
  </>)
};

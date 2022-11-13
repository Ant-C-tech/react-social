import { ControlBar, Content } from '@sections';
import { Message } from '@common';

export const Help = () => {
  return (
    <>
      <Content>
        <Message type={'message-info'} title={'Help'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </Content>
      <ControlBar />
    </>
  );
};

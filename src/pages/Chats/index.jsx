import { ControlBar, Content } from '@sections';
import { Message } from '@common';

export const Chats = () => {
  return (
    <>
      <Content>
        <Message type={'message-info'} title={'Chats'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </Content>
      <ControlBar />
    </>
  );
};

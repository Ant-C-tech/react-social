import { Message } from '@common/Message/';

export const NothingWasFoundMessage = () => {
  return (
    <Message
      type={'message-info'}
      title='Nothing was found according to your request.'
    >
      <p>Try to change your search parameters.</p>
      <p>Happy news!</p>
    </Message>
  );
};

import { Message } from '../message/Message';

export const NothingWasFoundMessage = () => {
	return (
		<Message type={'info'} title='Nothing was found according to your request.'>
			<p>Try to change your search parameters.</p>
			<p>Happy news!</p>
		</Message>
	)
}

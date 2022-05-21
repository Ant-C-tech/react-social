import './message.css';

import {
Error
} from '@material-ui/icons';

export const Message = ({ type, title, text }) => {
	return (
		<article className={`${type} message`} >
			<h2 className="message-title">{title}</h2>
			<Error />
			<p className="message-text">{text}</p>
		</article >
	)
};

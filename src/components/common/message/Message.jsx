import './message.css';

import {
	Error
} from '@material-ui/icons';

export const Message = ({ type, title, children }) => {
	return (
		<article className={`${type} message`} >
			<h2 className="message-title">{title}</h2>
			<Error className="message-icon" />
			<div className="message-text">
				{children}
			</div>
		</article >
	)
};

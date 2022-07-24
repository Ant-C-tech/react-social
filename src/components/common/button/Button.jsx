import './button.css';

import { MenuBook, CancelPresentation, FolderSpecial, People, AddCircle, RemoveCircle, Backspace } from '@material-ui/icons';

const buttonIcons = {
	'Read More': MenuBook,
	'Hide full text': CancelPresentation,
	'Add to favorite': FolderSpecial,
	'Show Contacts': People,
	'Hide Contacts': RemoveCircle,
	'Add More Countries': AddCircle,
	'Remove Country': RemoveCircle,
	'Add More Categories': AddCircle,
	'Remove Category': RemoveCircle,
	'Add More Languages': AddCircle,
	'Remove Language': RemoveCircle,
	'Clear Keywords': Backspace
}

export const Button = ({ text, onClick }) => {
	const Icon = buttonIcons[text];

	return <button className='button' onClick={onClick}>
		{buttonIcons[text] && <Icon className='button-icon' />}
		{text}
	</button>;
};

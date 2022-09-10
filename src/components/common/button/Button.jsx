import './button.css';

import greenHighlighterIcon from '../../../assets/highlighter-svgrepo-com-green.svg'
import blueHighlighterIcon from '../../../assets/highlighter-svgrepo-com-blue.svg'
import orangeHighlighterIcon from '../../../assets/highlighter-svgrepo-com-orange.svg'
import pinkHighlighterIcon from '../../../assets/highlighter-svgrepo-com-pink.svg'
import purpleHighlighterIcon from '../../../assets/highlighter-svgrepo-com-purple.svg'
import yellowHighlighterIcon from '../../../assets/highlighter-svgrepo-com-yellow.svg'

import {
	MenuBook,
	CancelPresentation,
	FolderSpecial,
	People,
	AddCircle,
	RemoveCircle,
	Backspace
} from '@material-ui/icons';

const buttonComponentIcons = {
	'Read More': MenuBook,
	'Hide full text': CancelPresentation,
	'Add to favorite': FolderSpecial,
	'Remove from favorite': RemoveCircle,
	'Show Contacts': People,
	'Hide Contacts': RemoveCircle,
	'Add More Countries': AddCircle,
	'Remove Country': RemoveCircle,
	'Add More Categories': AddCircle,
	'Remove Category': RemoveCircle,
	'Add More Languages': AddCircle,
	'Remove Language': RemoveCircle,
	'Clear Keywords': Backspace,
}

const buttonImageIcons = {
	'green-highlighter': greenHighlighterIcon,
	'blue-highlighter': blueHighlighterIcon,
	'orange-highlighter': orangeHighlighterIcon,
	'pink-highlighter': pinkHighlighterIcon,
	'purple-highlighter': purpleHighlighterIcon,
	'yellow-highlighter': yellowHighlighterIcon
}

export const Button = ({ text, showText = true, active, onClick }) => {
	const Icon = buttonComponentIcons[text];

	return <button
		className={
			`button
		${!showText ? 'button-without-text' : ''}
		${active ? 'button-active' : ''}`
		}
		onClick={onClick}
	>
		{buttonComponentIcons[text] && <Icon className='button-component-icon' />}
		{buttonImageIcons[text] && <img className='button-image-icon' src={buttonImageIcons[text]} alt='' />}
		{showText && text}
	</button>;
};

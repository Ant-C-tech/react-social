import './customLink.css';

import { Icon } from '../icon/Icon';

export const CustomLink = (props) => {
	const { content, href, target, modification, text, active } = props;
	return (
		<a className={`link ${modification} ${active}`} href={href} target={target} active={ active}>
			{modification === 'icon' ? <Icon {...props} /> : content}
			{text && <span className='link-add-text'>{text}</span>}
		</a>
	);
};

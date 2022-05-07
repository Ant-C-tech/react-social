import './customLink.css';

import { Icon } from '../icon/Icon';

export const CustomLink = (props) => {
	const { content, href, target, modification, text } = props;
	return (
		<a className={`link ${modification}`} href={href} target={target}>
			{modification === 'icon' ? <Icon {...props} /> : content}
			{text && <span className='link-add-text'>{text}</span>}
		</a>
	);
};

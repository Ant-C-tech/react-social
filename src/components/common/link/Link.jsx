import './link.css';

import { Icon } from '../icon/Icon';

export const Link = (props) => {
	const { content, href, target, modification } = props;
	return (
		<a className={`link ${modification}`} href={href} target={target}>
			{modification === 'icon' ? <Icon { ...props } /> : content}
		</a>
	);
};

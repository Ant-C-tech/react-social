import './customLink.css';

import { Link } from 'react-router-dom';

export const CustomLink = ({ type, content, href, modification, active }) => {
	return type === 'external' ?
		<a className={`link ${modification} ${active}`}
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			active={active}>
			{content}
		</a>
		: <Link className={`link ${modification} ${active}`}
			to={href}
			active={active}>
			{content}
		</Link>
};

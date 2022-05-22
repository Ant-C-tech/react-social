import './customLink.css';

// import { Icon } from '../icon/Icon';

export const CustomLink = (props) => {
	const { content, href, target, modification, active } = props;
	return (
		<a className={`link ${modification} ${active}`} href={href} target={target} active={ active}>
			{content}
		</a>
	);
};

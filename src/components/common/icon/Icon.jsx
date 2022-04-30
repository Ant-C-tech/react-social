import './icon.css';

export const Icon = (props) => {
	const { content, href, target, counter } = props;
	return (
		<>
			<span className={'icon-image'} href={href} target={target}>
				{content}
			</span>
			{counter ? <span span className='icon-badge'>{counter}</span> : null}
		</>
	);
};

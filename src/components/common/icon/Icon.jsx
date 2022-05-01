import './icon.css';

export const Icon = (props) => {
	const { content, counter} = props;
	return (
		<>
			<span className={'icon-image'}>
				{content}
			</span>
			{counter ? <span className='icon-badge'>{counter}</span> : null}
		</>
	);
};

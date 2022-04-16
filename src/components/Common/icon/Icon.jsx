import './icon.css';

export const Icon = ({ icon, counter }) => {
	return (
		<div className='topbar-icon'>
			{icon}
			<span className='topbar-icon-badge'>{counter}</span>
		</div>
	);
};

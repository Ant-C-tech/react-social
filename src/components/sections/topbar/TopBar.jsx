import './topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { CustomLink } from '../../common/customLink/CustomLink';
import { SearchBar } from '../../common/searchbar/SearchBar';

const topBarLinks = [{ type: 'internal', text: 'Settings', path: '/settings' }, { type: 'internal', text: 'Help', path: '/help' }];
const topBarIconLinks = [
	{ type: 'internal', icon: Person, path: 'person', messageCounter: '1' },
	{ type: 'internal', icon: Chat, path: 'chat', messageCounter: '2' },
	{ type: 'internal',  icon: Notifications, path: 'notifications', messageCounter: '6' },
];

export const TopBar = () => {
	return (
		<header className='topbar container-flex'>
			<div className='topbar-left'>
				<CustomLink type='internal' content='OrganiZeR' href='/' modification='logo hover-underline'/>
			</div>
			<div className='topbar-center'>
				<div className='topbar-links'>
					{topBarLinks.map((link, index) => (
						<CustomLink key={index} type={link.type} content={link.text} href={link.path} modification='hover-underline'/>
					))}
				</div>
				<div className='topbar-icons'>
					{topBarIconLinks.map((iconLink, index) => {
						const Icon = iconLink['icon'];
						return (
							<CustomLink
								key={index}
								type={iconLink.type}
								content={<><Icon /><span className='icon-badge'>{iconLink.messageCounter}</span></>}
								href={iconLink.path}
								modification='hover-left-line'
							/>
						);
					})}
					<CustomLink
						type='internal'
						content={<BigHead className='profile-image' />}
						href='/profile'
						modification='hover-left-line'
					/>
				</div>
			</div>
			<div className='topbar-right'>
				<SearchBar />
			</div>
		</header>
	);
};

import './topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { CustomLink } from '../common/customLink/CustomLink';
import { SearchBar } from '../common/searchbar/SearchBar';

export const TopBar = () => {
	return (
		<header className='topbar container-flex'>
			<div className='topbar-left'>
				<CustomLink content='SocialiZeR' href='homePage' target='_self' modification='logo' />
			</div>
			<div className='topbar-center'>
				<SearchBar placeholder='Happy hacking...' />
			</div>
			<div className='topbar-right'>
				<div className='topbar-links'>
					<CustomLink content='Home Page' href='homePage' target='_self' modification='topbar-link' />
					<CustomLink content='Time Line' href='timeLine' target='_self' modification='topbar-link' />
				</div>
				<div className='topbar-icons'>
					<CustomLink content={<Person />} href='person' target='_self' modification='icon' counter='1' />
					<CustomLink content={<Chat />} href='chat' target='_self' modification='icon' counter='2' />
					<CustomLink
						content={<Notifications />}
						href='notifications'
						target='_self'
						modification='icon'
						counter='6'
					/>
					<CustomLink content={<BigHead className='profile-image' />} href='profile' target='_self' modification='profile-image-container' />
				</div>
			</div>
		</header>
	);
};

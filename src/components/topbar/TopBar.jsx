import './topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { Link } from '../common/link/Link';
import { SearchBar } from '../common/searchbar/SearchBar';

export const TopBar = () => {
	return (
		<div className='topbar-container'>
			<div className='topbar-left'>
				<Link content='SocialiZeR' href='homePage' target='_self' modification='logo' />
			</div>
			<div className='topbar-center'>
				<SearchBar placeholder='Happy hacking...' />
			</div>
			<div className='topbar-right'>
				<div className='topbar-links'>
					<Link content='Home Page' href='homePage' target='_self' modification='topbar-link' />
					<Link content='Time Line' href='timeLine' target='_self' modification='topbar-link' />
				</div>
				<div className='topbar-icons'>
					<Link content={<Person />} href='person' target='_blank' modification='icon' counter='1' />
					<Link content={<Chat />} href='chat' target='_blank' modification='icon' counter='2' />
					<Link
						content={<Notifications />}
						href='notifications'
						target='_blank'
						modification='icon'
						counter='6'
					/>
					<div className='profile-image-container'>
						<BigHead className='profile-image' />
					</div>
				</div>
			</div>
		</div>
	);
};

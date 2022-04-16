import './topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { Link } from '../Common/link/Link';
import { Icon } from '../Common/icon/Icon';
import { SearchBar } from '../Common/searchbar/SearchBar';

export const TopBar = () => {
	return (
		<div className='topbar-container'>
			<div className='topbar-left'>
				<span className='logo'>React Social</span>
			</div>
			<div className='topbar-center'>
				<SearchBar placeholder='Happy hacking...' />
			</div>
			<div className='topbar-right'>
				<div className='topbar-links'>
					<Link text='Home Page' />
					<Link text='Time Line' />
				</div>
				<div className='topbar-icons'>
					<Icon icon={<Person />} counter='1' />
					<Icon icon={<Chat />} counter='2' />
					<Icon icon={<Notifications />} counter='1' />
					<div className='profile-image-container'>
						<BigHead />
					</div>
				</div>
			</div>
		</div>
	);
};

import './topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { Link } from '../common/link/Link';
import { Icon } from '../common/icon/Icon';
import { SearchBar } from '../common/searchbar/SearchBar';

export const TopBar = () => {
	return (
		<div className='topbar-container'>
			<div className='topbar-left'>
				<h1 className='logo'>React Social</h1>
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
						<BigHead className="profile-image"/>
					</div>
				</div>
			</div>
		</div>
	);
};

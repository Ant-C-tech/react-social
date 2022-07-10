import './navbar.css';

import { useState } from 'react'
import {
	Announcement,
	FolderSpecial,
	Chat,
	VideoLibrary,
	Notes,
	Bookmark,
	WorkOutline,
	Event,
	School,
	Translate,
	FormatListNumbered,
	MusicNote
} from '@material-ui/icons';

import { BigHead } from '@bigheads/core';

import { CustomLink } from '../../common/customLink/CustomLink';
import { Button } from '../../common/button/Button';

const navBarItems = [
	{ type: 'internal', icon: Announcement, path: '/', text: 'News' },
	{ type: 'internal', icon: FolderSpecial, path: '/favorite_news', text: 'My Favorite News' },
	{ type: 'internal', icon: FormatListNumbered, path: '/todo', text: 'ToDo' },
	{ type: 'internal', icon: Notes, path: '/notes', text: 'Notes' },
	{ type: 'internal', icon: Event, path: '/events', text: 'Events' },
	{ type: 'internal', icon: Translate, path: '/translation', text: 'Translation' },
	{ type: 'internal', icon: Bookmark, path: '/bookmarks', text: 'Bookmarks' },
	{ type: 'internal', icon: VideoLibrary, path: '/videos', text: 'Videos' },
	{ type: 'internal', icon: MusicNote, path: '/music', text: 'Music' },
	{ type: 'internal', icon: WorkOutline, path: '/jobs', text: ' Jobs' },
	{ type: 'internal', icon: School, path: '/courses', text: ' Courses' },
	{ type: 'internal', icon: Chat, path: '/chats', text: ' Chats' },
];

// Mock data for friends list
const rug = require('random-username-generator');
rug.setSeperator(' ');

const getRandomNameToUpper = () => {
	const randomName = rug.generate();
	return randomName
		.split(' ')
		.map((word) => {
			return `${word[0].toUpperCase()}${word.slice(1)}`;
		})
		.join(' ');
};

const friendsCounter = 7;
const friends = [];
for (let index = 0; index < friendsCounter; index++) {
	friends.push(getRandomNameToUpper());
}
// End of Mock data for friends list

export const NavBar = () => {
	const [isContactsShown, setIsContactsShown] = useState(false)

	return (
		<nav className='navbar'>
			<ul className='navbar-nav'>
				{navBarItems.map((navItem, index) => {
					const Icon = navItem['icon'];
					return (
						<li key={index} className='navbar-nav-item'>
							<CustomLink
								type={navItem.type}
								content={<><Icon /><span className='link-add-text'>{navItem.text}</span></>}
								href={navItem.path}
								modification='hover-left-line'
							/>
						</li>
					);
				})}
			</ul>
			<hr />
			<Button
				text={isContactsShown ? 'Hide Contacts' : 'Show Contacts'}
				className='read-more-button'
				onClick={() => setIsContactsShown((prevState) => !prevState)} />
			{isContactsShown && <ul className='navbar-contacts'>
				{friends.map((friend, index) => (
					<li key={index} className='navbar-contact'>
						<CustomLink
							type='internal'
							content={<>
								<BigHead className='navbar-contact-image' />
								<span className='link-add-text'>{friend}</span>
							</>}
							href='/contacts'
							modification='hover-left-line'
							text={friend}
							active=''
						/>
					</li>
				))}
			</ul>
			}
		</nav>
	);
};

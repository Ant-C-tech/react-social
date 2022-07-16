import './navbar.css';

import { useState } from 'react'
import { BigHead } from '@bigheads/core';
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

import { CustomLink } from '../../common/customLink/CustomLink';
import { Button } from '../../common/button/Button';

const navBarItems = [
	{ type: 'internal', icon: Announcement, path: 'organizer/', text: 'News' },
	{ type: 'internal', icon: FolderSpecial, path: 'organizer/favorite_news', text: 'My Favorite News' },
	{ type: 'internal', icon: FormatListNumbered, path: 'organizer/todo', text: 'ToDo' },
	{ type: 'internal', icon: Notes, path: 'organizer/notes', text: 'Notes' },
	{ type: 'internal', icon: Event, path: 'organizer/events', text: 'Events' },
	{ type: 'internal', icon: Translate, path: 'organizer/translation', text: 'Translation' },
	{ type: 'internal', icon: Bookmark, path: 'organizer/bookmarks', text: 'Bookmarks' },
	{ type: 'internal', icon: VideoLibrary, path: 'organizer/videos', text: 'Videos' },
	{ type: 'internal', icon: MusicNote, path: 'organizer/music', text: 'Music' },
	{ type: 'internal', icon: WorkOutline, path: 'organizer/jobs', text: ' Jobs' },
	{ type: 'internal', icon: School, path: 'organizer/courses', text: ' Courses' },
	{ type: 'internal', icon: Chat, path: 'organizer/chats', text: ' Chats' },
];


export const NavBar = ({contacts}) => {
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
				{contacts.map((contact, index) => (
					<li key={index} className='navbar-contact'>
						<CustomLink
							type='internal'
							content={<>
								<BigHead className='navbar-contact-image' />
								<span className='link-add-text'>{contact}</span>
							</>}
							href={`organizer/contact/${index}`}
							modification='hover-left-line'
							text={contact}
						/>
					</li>
				))}
			</ul>
			}
		</nav>
	);
};

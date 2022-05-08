import './sidebar.css';

import {
	Announcement,
	Chat,
	VideoLibrary,
	Notes,
	Bookmark,
	WorkOutline,
	Event,
	School,
	Translate
} from '@material-ui/icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { BigHead } from '@bigheads/core';

import { CustomLink } from '../common/customLink/CustomLink';

const theme = createTheme({
	palette: {
		neutral: {
			main: '#3f3f3f',
			contrastText: '#f3f3f3',
		},
	},
});

const sideBarNavItems = [
	{ icon: Announcement, path: 'news', text: 'News' },
	{ icon: Chat, path: 'chat', text: 'Chats' },
	{ icon: Event, path: 'events', text: 'Events' },
	{ icon: Notes, path: 'notes', text: 'Notes' },
	{ icon: Bookmark, path: 'bookmarks', text: 'Bookmarks' },
	{ icon: Translate, path: 'translation', text: 'Translation' },
	{ icon: VideoLibrary, path: 'videos', text: 'Videos' },
	{ icon: WorkOutline, path: 'jobs', text: 'Jobs' },
	{ icon: School, path: 'courses', text: 'Courses' },
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

const friendsCounter = 8;
const friends = [];
for (let index = 0; index < friendsCounter; index++) {
	friends.push(getRandomNameToUpper());
}
// End of Mock data for friends list

export const SideBar = () => {
	return (
		<nav className='sidebar'>
			<ul className='sidebar-nav'>
				{sideBarNavItems.map((navItem, index) => {
					const Icon = navItem['icon'];
					return (
						<li key={index} className='sidebar-nav-item'>
							<CustomLink
								content={<Icon />}
								href={navItem.path}
								target='_self'
								modification='icon'
								text={navItem.text}
							/>
						</li>
					);
				})}
			</ul>
			<hr />
			<ThemeProvider theme={theme}>
				<Button
					variant='outlined'
					color='neutral'
					style={{
						fontFamily: 'inherit',
						fontSize: '14px',
						fontWeight: 'bold',
						margin: '0 auto 30px',
						display: 'block',
					}}
				>
					Show More
				</Button>
			</ThemeProvider>
			<ul className='sidebar-friends'>
				{friends.map((friend, index) => (
					<li key={index} className='sidebar-friend'>
						<CustomLink
							content={<BigHead className='sidebar-friend-image' />}
							href='friend-page'
							target='_self'
							modification='sidebar-friend-image-container'
							text={friend}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
};

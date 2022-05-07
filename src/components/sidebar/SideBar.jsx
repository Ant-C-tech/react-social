import './sidebar.css';

import {
	RssFeed,
	Chat,
	VideoLibrary,
	Group,
	Bookmark,
	HelpOutline,
	WorkOutline,
	Event,
	School,
} from '@material-ui/icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { CustomLink } from '../common/customLink/CustomLink';

const theme = createTheme({
	palette: {
		neutral: {
			main: '#3f3f3f',
			contrastText: '#f3f3f3',
		},
	},
});

export const SideBar = () => {
	return (
		<nav className='sidebar'>
			<ul className='sidebar-nav'>
				<li className='sidebar-nav-item'>
					<CustomLink content={<RssFeed />} href='feed' target='_self' modification='icon' text='Feed' />
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink content={<Chat />} href='chat' target='_self' modification='icon' text='Chats' />
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink
						content={<VideoLibrary />}
						href='videos'
						target='_self'
						modification='icon'
						text='Videos'
					/>
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink content={<Group />} href='groups' target='_self' modification='icon' text='Groups' />
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink
						content={<Bookmark />}
						href='bookmarks'
						target='_self'
						modification='icon'
						text='Bookmarks'
					/>
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink
						content={<HelpOutline />}
						href='questions'
						target='_self'
						modification='icon'
						text='Questions'
					/>
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink
						content={<WorkOutline />}
						href='bookmarks'
						target='_self'
						modification='icon'
						text='Jobs'
					/>
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink content={<Event />} href='events' target='_self' modification='icon' text='Events' />
				</li>
				<li className='sidebar-nav-item'>
					<CustomLink content={<School />} href='courses' target='_self' modification='icon' text='Courses' />
				</li>
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
						margin: '0 auto',
						display: 'block',
					}}
				>
					Show More
				</Button>
			</ThemeProvider>
		</nav>
	);
};

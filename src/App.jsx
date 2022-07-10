import './app.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { News } from './pages/news/News';
import { FavoriteNews } from './pages/favoriteNews/FavoriteNews';
import { ToDo } from './pages/todo/ToDo';
import { Notes } from './pages/notes/Notes';
import { Events } from './pages/events/Events';
import { Translation } from './pages/translation/Translation';
import { Bookmarks } from './pages/bookmarks/Bookmarks';
import { Videos } from './pages/videos/Videos';
import { Music } from './pages/music/Music';
import { Jobs } from './pages/jobs/Jobs';
import { Courses } from './pages/courses/Courses';
import { Chats } from './pages/chats/Chats';
import { Settings } from './pages/settings/Settings';
import { Help } from './pages/help/Help';
import { TopBar } from './components/sections/topbar/TopBar';
import { NavBar } from './components/sections/navbar/NavBar';

const App = () => (
	<Router>
		<TopBar />
		<main className="container-flex">
			<NavBar />
			<Routes>
				<Route exact path='/' element={<News />} />
				<Route path='/favorite_news' element={<FavoriteNews />} />
				<Route path='/todo' element={<ToDo />} />
				<Route path='/notes' element={<Notes />} />
				<Route path='/events' element={<Events />} />
				<Route path='/translation' element={<Translation />} />
				<Route path='/bookmarks' element={<Bookmarks />} />
				<Route path='/videos' element={<Videos />} />
				<Route path='/music' element={<Music />} />
				<Route path='/jobs' element={<Jobs />} />
				<Route path='/courses' element={<Courses />} />
				<Route path='/chats' element={<Chats />} />

				<Route path='/settings' element={<Settings />} />
				<Route path='/help' element={<Help />} />
			</Routes>
		</main>


	</Router>
)

export default App;

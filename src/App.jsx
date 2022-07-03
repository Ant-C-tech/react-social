import './app.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { News } from './pages/news/News';
import { FavoriteNews } from './pages/favoriteNews/FavoriteNews';

const App = () => (
	<Router>
		<Routes>
			<Route exact path='/' element={<News />} />
			<Route exact path='/favorite_news' element={<FavoriteNews />} />
		</Routes>
	</Router>
)

export default App;

import './news.css';

import { Info } from '@material-ui/icons';

export const News = () => {
	return (
		<article className="news">
			<header>
				<Info className="news-title-icon"/>
				<h2 className="news-title"> My first news</h2>
			</header>
			<img className="news-image" src="https://picsum.photos/500/800" alt="news that I want to talk to you about" />
			<p className="news-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
			<footer></footer>
		</article>
	)
};

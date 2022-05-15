import './news.css';

import { Info } from '@material-ui/icons';

export const News = ({ title, image, text }) => {
	return (
		<article className="news">
			<header>
				<Info className="news-title-icon" />
				<h1 className="news-title">{title}</h1>
			</header>
			<img className="news-image" src={image} alt={title} />
			<p className="news-text">{text}</p>
			<footer></footer>
		</article>
	)
};

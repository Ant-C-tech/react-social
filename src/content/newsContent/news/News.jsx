import './news.css';

import { Info } from '@material-ui/icons';

export const News = ({ category, countries, title, image, text, pubDate }) => {
	return (
		<article className="news">
			<header className="news-header">
				<h3 className="news-category">{category}</h3>
				<div className="news-country">
					{countries.map((country, index) => (
						<h3 key={index} className="news-country">{country}</h3>
					))}
				</div>
			</header>
			<div className="news-title">
				<Info className="news-title-icon" />
				<h2 className="news-title-text">{title}</h2>
			</div>
			<img className="news-image" src={image} alt={title} />
			<p className="news-text">{text}</p>
			<footer>
				<p className="news-date">{pubDate}</p>
			</footer>
		</article>
	)
};

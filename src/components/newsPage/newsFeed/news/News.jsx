import './news.css';

import { FiberNew } from '@material-ui/icons';

import {Button} from '../../../common/button/Button'

export const News = ({ categories, countries, title, image, text, pubDate, creators }) => {
	const addDefaultSrc = (event) => {
		event.target.src = '../../../../assets/logo.png'
		event.target.className = 'news-default-image'
	}

	return (
		<article className="news">
			<header className="news-header">
				{categories && <div className="news-category">
					{categories.map((category, index) => (
						<h3 key={index}>{category}</h3>
					))}
				</div>}
				{countries && <div className="news-country">
					{countries.map((country, index) => (
						<h3 key={index}>{country}</h3>
					))}
				</div>}
			</header>
			<div className="news-title">
				<FiberNew className="news-title-icon" />
				<h2 className="news-title-text">{title}</h2>
			</div>
			{image && <img onError={addDefaultSrc} className="news-image" src={image} alt={title} />}
			<p className="news-text">{text}</p>
			<Button text='Read More'/>
			<footer className="news-footer">
				<p className="news-date">{pubDate}</p>
				{creators && <div className="news-creators">
					{creators.map((creator, index) => (
						<p key={index}>{creator}</p>
					))}
				</div>}
			</footer>
		</article>
	)
};

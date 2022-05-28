import 'react-lazy-load-image-component/src/effects/blur.css';

import './news.css';

import { FiberNew } from '@material-ui/icons';
import {
	Bookmark, OndemandVideo
} from '@material-ui/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { CustomLink } from '../../../common/customLink/CustomLink';

export const News = ({ categories, countries, title, image, text, pubDate, creators, link, video }) => {
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

			<LazyLoadImage
				className="news-image"
				wrapperClassName="news-image-wrapper"
				effect="blur"
				src={image}
				alt={title}
			/>

			<p className="news-text">{text}<CustomLink content={<><Bookmark /><span className='link-add-text'>Read More...</span></>} href={link} target='_blank' modification='hover-underline' active='' /></p>

			{video && <CustomLink content={<><OndemandVideo /><span className='link-add-text'>Watch Now</span></>} href={video} target='_blank' modification='hover-left-line' active='' />}

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

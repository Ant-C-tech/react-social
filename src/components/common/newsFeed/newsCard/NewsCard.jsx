import 'react-lazy-load-image-component/src/effects/blur.css';

import './newsCard.css';

import { useState } from 'react'
import Highlighter from "react-highlight-words";
import { FiberNew } from '@material-ui/icons';
import {
	Bookmark, OndemandVideo
} from '@material-ui/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { CustomLink } from '../../customLink/CustomLink';
import { Button } from '../../button/Button';

export const NewsCard = ({
	news,
	keywords,
	isFavorite,
	addToFavorite,
	removeFromFavorite,
}) => {
	const [isContentShown, setIsContentShown] = useState(false)

	const {
		title,
		link,
		creator,
		video_url,
		description,
		content,
		pubDate,
		image_url,
		source_id,
		country,
		category,
		language } = news

	return (
		<article className='news-card' >
			<header className="news-card-header">
				{category && <div className="news-card-category">
					{category.map((currentCategory, index) => (
						<h3 key={index}>{currentCategory}</h3>
					))}
				</div>}
				{country && <div className="news-card-country">
					{country.map((currentCountry, index) => (
						<h3 key={index}>{currentCountry}</h3>
					))}
				</div>}
			</header>

			<div className={`news-card-content ${language}`}>
				<div className="news-card-title">
					<FiberNew className="news-card-title-icon" />
					<h2 className="news-card-title-text">
						<Highlighter
							highlightClassName="news-card-highlight"
							searchWords={keywords}
							autoEscape={true}
							textToHighlight={title || ''}
						/>
					</h2>
				</div>

				{image_url && <LazyLoadImage
					className="news-card-image"
					wrapperClassName="news-card-image-wrapper"
					effect="blur"
					src={image_url}
					alt={title}
				/>}

				{video_url &&
					<CustomLink
						content={<>
							<OndemandVideo /><span className='link-add-text'>Watch Now</span>
						</>}
						href={video_url}
						target='_blank'
						modification='hover-left-line'
						active=''
					/>}

				<p className="news-card-description">
					<Highlighter
						highlightClassName="news-card-highlight"
						searchWords={keywords}
						autoEscape={true}
						textToHighlight={description || ''}
					/>
				</p>

				{isContentShown &&
					<p className="news-card-full-text">
						<Highlighter
							highlightClassName="news-card-highlight"
							searchWords={keywords}
							autoEscape={true}
							textToHighlight={content || ''}
						/>
					</p>
				}

				<div className="news-card-controls">
					{content &&
						<Button
							text={isContentShown ? 'Hide full text' : 'Read More'}
							className='read-more-button'
							onClick={() => setIsContentShown((prevState) => !prevState)}
						/>}
					<CustomLink
						content={<>
							<Bookmark /><span className='link-add-text'>Visit original source...</span>
						</>}
						href={link}
						target='_blank'
						modification='hover-underline'
						active='' />
					{isFavorite ?
						<Button
							text='Remove from favorite'
							className='remove-from-favorite-button'
							onClick={() => {
								removeFromFavorite()
							}}
						/> :
						<Button
							text='Add to favorite'
							className='add-to-favorite-button'
							onClick={() => {
								addToFavorite()
							}}
						/>}
				</div>
			</div>

			<footer className="news-card-footer">
				<p className="news-card-date">{pubDate}</p>
				{(creator || source_id)
					&& <div className="news-card-creators">
						{creator ? creator.map((currentCreator, index) => (
							<p key={index}>{currentCreator}</p>
						)) :
							source_id &&
							<p>{source_id}</p>
						}
					</div>}
			</footer>
		</article>
	)
};

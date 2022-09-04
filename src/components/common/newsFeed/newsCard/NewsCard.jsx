import 'react-lazy-load-image-component/src/effects/blur.css';

import './newsCard.css';

import { useState } from 'react'
import Highlighter from "react-highlight-words";
import uuid from 'react-uuid';
import {
	Bookmark,
	OndemandVideo,
	FiberNew
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
	addHighlight
}) => {
	const [isContentShown, setIsContentShown] = useState(false)
	const [isMouseDown, setIsMouseDown] = useState(false)

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
		language,
		highlights } = news

	const getHighlightedDescription = () => {
		console.log('work');
		console.log(highlights);

		if (highlights && highlights.description) {
			const sortedDescriptionHighlights = highlights.description.sort((highlight1, highlight2) => {
				return highlight1.startIndex - highlight2.startIndex
			})

			let endOfPrevHighlight = 0
			const correctedDescriptionHighlights = sortedDescriptionHighlights.map((highlight, index) => {
				if (index === 0) {
					endOfPrevHighlight = highlight.endIndex
					return highlight
				} else {
					if (highlight.startIndex < endOfPrevHighlight) {
						highlight.startIndex = endOfPrevHighlight
						endOfPrevHighlight = highlight.endIndex
						return highlight
					} else {
						endOfPrevHighlight = highlight.endIndex
						return highlight
					}
				}
			})

			let highlightedDescription = []
			const initialDescriptionArray = description.split('')

			let endOfPrevHighlightForParsing = 0
			correctedDescriptionHighlights.forEach((highlight, index) => {
				if (correctedDescriptionHighlights.length === 1 && highlight.startIndex !== 0) {
					highlightedDescription.push(
						<span key={uuid()}>
							{initialDescriptionArray.slice(0, highlight.startIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span className={highlight.highlighter} key={uuid()}>
							{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span key={uuid()}>
							{initialDescriptionArray.slice(highlight.endIndex, initialDescriptionArray.length).join('')}
						</span>
					)
				} else if (correctedDescriptionHighlights.length === 1 && highlight.startIndex === 0) {
					highlightedDescription.push(
						<span className={highlight.highlighter} key={uuid()}>
							{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span key={uuid()}>{initialDescriptionArray.slice(highlight.endIndex, initialDescriptionArray.length).join('')}
						</span>
					)
				} else if (index === 0 && highlight.startIndex !== 0) {
					highlightedDescription.push(
						<span key={uuid()}>
							{initialDescriptionArray.slice(0, highlight.startIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span className={highlight.highlighter} key={uuid()}>
							{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
						</span>
					)
					endOfPrevHighlightForParsing = highlight.endIndex
				} else if (index === 0 && highlight.startIndex === 0) {
					highlightedDescription.push(
						<span className={highlight.highlighter} key={uuid()}>
							{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
						</span>
					)
					endOfPrevHighlightForParsing = highlight.endIndex
				} else if (index === correctedDescriptionHighlights.length - 1
					&& highlight.endIndex < initialDescriptionArray.length - 1) {
					highlightedDescription.push(
						<span key={uuid()}>
							{initialDescriptionArray.slice(endOfPrevHighlightForParsing, highlight.startIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span className={highlight.highlighter} key={uuid()}>
							{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span key={uuid()}>
							{initialDescriptionArray.slice(highlight.endIndex, initialDescriptionArray.length).join('')}
						</span>
					)
				} else if (index === correctedDescriptionHighlights.length - 1
					&& highlight.startIndex !== endOfPrevHighlightForParsing) {
					highlightedDescription.push(
						<span key={uuid()}>
							{initialDescriptionArray.slice(endOfPrevHighlightForParsing, highlight.startIndex).join('')}
						</span>
					)
					highlightedDescription.push(
						<span className={highlight.highlighter} key={uuid()}>
							{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
						</span>
					)
					endOfPrevHighlightForParsing = highlight.endIndex
				}
			})

			console.log(highlightedDescription);
			return highlightedDescription
		} else {
			return description
		}
	}



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
						type='external'
						content={<>
							<OndemandVideo /><span className='link-add-text'>Watch Now</span>
						</>}
						href={video_url}
						target='_blank'
						modification='hover-left-line'
						active=''
					/>}

				<p className="news-card-description" onMouseUp={() => { setIsMouseDown(false); addHighlight() }} onMouseDown={() => { setIsMouseDown(true) }}>
					{/* <Highlighter
						highlightClassName="news-card-highlight"
						searchWords={keywords}
						autoEscape={true}
						textToHighlight={getHighlightedDescription || ''}
					/> */}
					{isMouseDown ? description : getHighlightedDescription()}
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
						type='external'
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
					&& <div className={`news-card-creators ${language}`}>
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

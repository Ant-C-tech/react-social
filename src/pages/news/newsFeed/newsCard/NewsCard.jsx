import 'react-lazy-load-image-component/src/effects/blur.css';

import './newsCard.css';

import { useState } from 'react'
import Highlighter from "react-highlight-words";
import { FiberNew } from '@material-ui/icons';
import {
	Bookmark, OndemandVideo
} from '@material-ui/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { CustomLink } from '../../../../components/common/customLink/CustomLink';
import { Button } from '../../../../components/common/button/Button';

export const NewsCard = ({ categories, countries, title, image, description, content, pubDate, creators, link, video, language, keywords }) => {
	const [isContentShown, setIsContentShown] = useState(false)

	return (
		<article className='news-card' >
			<header className="news-card-header">
				{categories && <div className="news-card-category">
					{categories.map((category, index) => (
						<h3 key={index}>{category}</h3>
					))}
				</div>}
				{countries && <div className="news-card-country">
					{countries.map((country, index) => (
						<h3 key={index}>{country}</h3>
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
							textToHighlight={title}
						/>
					</h2>
				</div>

				<LazyLoadImage
					className="news-card-image"
					wrapperClassName="news-card-image-wrapper"
					effect="blur"
					src={image}
					alt={title}
				/>

				{video && <CustomLink content={<><OndemandVideo /><span className='link-add-text'>Watch Now</span></>} href={video} target='_blank' modification='hover-left-line' active='' />}

				<p className="news-card-description">
					<Highlighter
						highlightClassName="news-card-highlight"
						searchWords={keywords}
						autoEscape={true}
						textToHighlight={description}
					/>
				</p>

				{isContentShown && <p className="news-card-full-text">
					<Highlighter
						highlightClassName="news-card-highlight"
						searchWords={keywords}
						autoEscape={true}
						textToHighlight={content}
					/>
				</p>}

				<div className="news-card-controls">
					{content && <Button
						text={isContentShown ? 'Hide full text' : 'Read More'}
						className='read-more-button'
						onClick={() => setIsContentShown((prevState) => !prevState)} />}
					<CustomLink
						content={<><Bookmark /><span className='link-add-text'>Visit original source...</span></>}
						href={link}
						target='_blank'
						modification='hover-underline'
						active='' />
					<Button
						text='Read Later'
						className='read-later-button'
						onClick={() => { }} />
				</div>
			</div>

			<footer className="news-card-footer">
				<p className="news-card-date">{pubDate}</p>
				{creators && <div className="news-card-creators">
					{creators.map((creator, index) => (
						<p key={index}>{creator}</p>
					))}
				</div>}
			</footer>
		</article>
	)
};

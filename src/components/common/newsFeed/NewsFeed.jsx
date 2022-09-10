import './newsFeed.css';

import { useEffect, useRef } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint';

import { NewsCard } from './newsCard/NewsCard';
import { NewsCardSkeleton } from './newsCardSkeleton/NewsCardSkeleton';

import { getIsFavorite } from './utils/getIsFavorite';
import { addToFavorite } from './utils/addToFavorite';
import { removeFromFavorite } from './utils/removeFromFavorite';

export const NewsFeed = ({
	newsSet,
	favoriteNews,
	setFavoriteNews,
	keywords,
	startNews,
	loading,
	setNeedMoreNews,
	needScroll,
	setNeedScroll,
	message,
	activeHighlighter }) => {
	const currentRef = useRef(null)

	useEffect(() => {
		if (needScroll) {
			currentRef.current && currentRef.current.scrollIntoView({ block: "start" })
			setNeedScroll(false)
		}
	}, [needScroll, setNeedScroll])

	return (
		<section className={`news-feed ${activeHighlighter}`} >
			{loading ?
				<SkeletonTheme baseColor="#dce2e4" highlightColor="#b2c0c4">
					<NewsCardSkeleton skeletons={2} />
				</SkeletonTheme>
				: message ? message :
					<ul className='news-list' >
						{newsSet.map((news, index) =>
							<li
								className={`news-list-item`}
								key={index}
								ref={index === startNews ? currentRef : null}>
								<NewsCard
									news={news}
									keywords={keywords}
									isFavorite={getIsFavorite(favoriteNews, news.link)}
									addToFavorite={() => {
										addToFavorite(favoriteNews, setFavoriteNews, news)
									}}
									removeFromFavorite={() => {
										removeFromFavorite(favoriteNews, setFavoriteNews, news)
									}}
									addHighlight={() => {
										if (window.getSelection().toString().length > 0 && activeHighlighter) {
											const parentText = window.getSelection().baseNode.textContent
											let targetPartOfNews
											Object.entries(favoriteNews[index]).forEach((keyValue) => {
												const key = keyValue[0]
												const value = keyValue[1]
												if (value === parentText) {
													targetPartOfNews = key
												}
											})

											const startIndex = window.getSelection().anchorOffset
											const endIndex = window.getSelection().focusOffset

											const newHighlight = {
												highlighter: activeHighlighter,
												startIndex: startIndex < endIndex ? startIndex : endIndex,
												endIndex: startIndex < endIndex ? endIndex : startIndex,
											}

											setFavoriteNews(favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
												if (currentFavoriteNewsIndex === index) {
													!currentFavoriteNews.highlights && (currentFavoriteNews['highlights'] = {});
													!currentFavoriteNews.highlights[targetPartOfNews] && (currentFavoriteNews.highlights[targetPartOfNews] = [])

													const updatedArrayOfHighlights =
														currentFavoriteNews.highlights[targetPartOfNews].filter((highlight) => {
															if (
																(highlight.startIndex < newHighlight.startIndex) ||
																(highlight.endIndex > newHighlight.endIndex)) {
																return highlight
															} else {
																return false
															}
														})
															.map((highlight) => {
																return highlight
															})
													updatedArrayOfHighlights.push(newHighlight)

													currentFavoriteNews.highlights[targetPartOfNews] = updatedArrayOfHighlights
													// console.log(updatedArrayOfHighlights);
													return currentFavoriteNews
												} else {
													return currentFavoriteNews
												}
											}))
										}
									}}
								/>
								{index === newsSet.length - 1
									&& <Waypoint
										onEnter={() => {
											setNeedMoreNews(true)
										}}
									/>}
							</li>
						)}
					</ul>
			}
		</section >
	);
};

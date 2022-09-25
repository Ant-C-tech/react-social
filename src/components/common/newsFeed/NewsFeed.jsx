import './newsFeed.css';

import { useEffect, useRef } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint';

import { NewsCard } from './newsCard/NewsCard';
import { NewsCardSkeleton } from './newsCardSkeleton/NewsCardSkeleton';

import { getIsFavorite } from '../../../utils/newsFeed/getIsFavorite';
import { addToFavorite } from '../../../utils/newsFeed/addToFavorite';
import { removeFromFavorite } from '../../../utils/newsFeed/removeFromFavorite';
import { addHighlight } from '../../../utils/newsFeed/addHighlight';

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
	activeTool }) => {
	const currentRef = useRef(null)

	useEffect(() => {
		if (needScroll) {
			currentRef.current && currentRef.current.scrollIntoView({ block: "start" })
			setNeedScroll(false)
		}
	}, [needScroll, setNeedScroll])

	return (
		<section className={`news-feed`} >
			{loading ?
				<SkeletonTheme baseColor="#dce2e4" highlightColor="#b2c0c4">
					<NewsCardSkeleton skeletons={2} />
				</SkeletonTheme>
				: message ? message :
					<ul className='news-list' >
						{newsSet.map((news, indexOfCurrentNews) =>
							<li
								className={`news-list-item`}
								key={indexOfCurrentNews}
								ref={indexOfCurrentNews === startNews ? currentRef : null}>
								<NewsCard
									createdFor={activeTool === null ? 'news' : 'favorite news'}
									news={news}
									keywords={keywords}
									activeTool={activeTool}
									isFavorite={getIsFavorite(favoriteNews, news.link)}
									addToFavorite={() => {
										addToFavorite(favoriteNews, setFavoriteNews, news)
									}}
									removeFromFavorite={() => {
										removeFromFavorite(favoriteNews, setFavoriteNews, news)
									}}
									addHighlight={(link, targetPart) => {
										addHighlight(
											favoriteNews,
											setFavoriteNews,
											activeTool,
											link,
											targetPart)
									}}
								/>
								{indexOfCurrentNews === newsSet.length - 1
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

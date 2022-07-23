import './newsFeed.css';

import { useEffect } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint';

import { useScrollTo } from '../../../pages/news/hooks/useScrollTo';

import { NewsCard } from './newsCard/NewsCard';
import { Message } from '../message/Message';
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
	setStartNews,
	loading,
	setNeedMoreNews }) => {

	const [currentRef, scrollToRef] = useScrollTo()

	console.log(startNews);

	useEffect(() => {
		scrollToRef()
	}, [newsSet, scrollToRef])

	return (
		<section className='news-feed' >
			{loading ?
				<SkeletonTheme baseColor="#dce2e4" highlightColor="#b2c0c4">
					<NewsCardSkeleton skeletons={2} />
				</SkeletonTheme>
				: newsSet.length > 0 ?
					<ul className='news-list' >
						{newsSet.map((news, index) =>
							<li
								className='news-list-item'
								key={index}
								ref={index === startNews ? currentRef : null}>
								<NewsCard
									news={news}
									keywords={keywords}
									isFavorite={getIsFavorite(favoriteNews, news.link)}
									addToFavorite={() => {
										addToFavorite(favoriteNews, setFavoriteNews, news)
										setStartNews(index)
									}}
									removeFromFavorite={() => {
										removeFromFavorite(favoriteNews, setFavoriteNews, news)
										setStartNews(index)
									}}
								/>
								{index === newsSet.length - 1
									&& <Waypoint
										onEnter={() => setNeedMoreNews(true)}
									/>}
							</li>
						)}
					</ul> :
					<Message type={'info'} title={'Nothing was found according to your request.'}>
						<p>Try to change your search parameters.</p>
						<p>Happy news!</p>
					</Message>
			}
		</section >
	);
};

import './newsFeed.css';

import { useEffect, useRef, useCallback } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import uuid from 'react-uuid'

import { useScrollTo } from '../../../pages/news/hooks/useScrollTo';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

import { NewsCard } from './newsCard/NewsCard';
import { Message } from '../message/Message';
import { NewsCardSkeleton } from './newsCardSkeleton/NewsCardSkeleton';

export const NewsFeed = ({ newsSet, keywords=[''], focusNewsIndex, setFocusNewsIndex, loading=false, setNeedMoreNews }) => {
	const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', [])

	const [currentRef, scrollToRef] = useScrollTo()

	useEffect(() => {
		scrollToRef()
	}, [scrollToRef])

	const observer = useRef()
	const lastNewsRef = useCallback(node => {
		if (loading) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setNeedMoreNews(true);
			};
		})
		if (node) observer.current.observe(node)
	}, [loading, setNeedMoreNews])

	return (
		<section className='news-feed' >
			{loading ?
				<SkeletonTheme baseColor="#dce2e4" highlightColor="#b2c0c4">
					<NewsCardSkeleton skeletons={2} />
				</SkeletonTheme>
				: newsSet.length > 0 ? <ul className='news-list' >
					{newsSet.map((news, index) => {
						return <li
							key={uuid()}
							className='news-list-item'
							ref={index === newsSet.length - 1 ? lastNewsRef : index === focusNewsIndex ? currentRef : null}
						>
							<NewsCard
								news={news}
								keywords={keywords}
								favoriteNews={favoriteNews}
								setFavoriteNews={setFavoriteNews}
								setFocusOnThisCard={() => setFocusNewsIndex(index)}
							/>
						</li>
					})}
				</ul> : <Message type={'info'} title={'Nothing was found according to your request.'}>
					<p>Try to change your search parameters.</p>
					<p>Happy news!</p>
				</Message>
			}
		</section>
	);
};

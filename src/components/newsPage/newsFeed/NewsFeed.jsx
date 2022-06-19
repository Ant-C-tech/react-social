import './newsFeed.css';

import uuid from 'react-uuid'

import { News } from './news/News';
import { Message } from '../../common/message/Message';

export const NewsFeed = ({ newsSet, lastNewsRef, newsFeedRef, loading }) => {
	return (
		<section className='news-feed' >
			{newsSet.length > 0 ? <ul className='news-list' ref={newsFeedRef} >
				{newsSet.map((news, index) => {
					return <li
						key={uuid()}
						className='news-list-item'
						ref={index === newsSet.length - 1 ? lastNewsRef : null}>
						<News
							categories={news.category}
							countries={news.country}
							title={news.title}
							image={news.image_url}
							text={news.description}
							pubDate={news.pubDate}
							creators={news.creator}
							link={news.link}
							video={news.video_url}
						/>
					</li>
				})}
			</ul> : !loading && <Message type={'info'} title={'Nothing was found according to your request.'}>
				<p>Try to change your search parameters.</p>
				<p>Happy news!</p>
			</Message>
			}
		</section>
	);
};

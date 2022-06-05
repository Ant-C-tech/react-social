import './newsFeed.css';

import { News } from './news/News';
import { Input } from '../../common/input/Input';
import { InputLegend } from './inputLegend/InputLegend';

export const NewsFeed = ({ newsSet, apiKey, setApiKey, lastNewsRef }) => {

	return (
		<section className='news-feed'>
			{newsSet.length > 0 ? <ul className='news-list'>
				{newsSet.map((news, index) => {
					return <li
						key={`${news.pubDate}_${news.source_id}_${news.title}`}
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
			</ul> : <Input Legend={InputLegend} value={apiKey} placeholder={"Please, input your API key"} onChange={setApiKey} />
			}
		</section>
	);
};

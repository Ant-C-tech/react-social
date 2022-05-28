import './newsFeed.css';

import { News } from './news/News';
import { Input } from '../../common/input/Input';
import { InputLegend } from './inputLegend/InputLegend';

export const NewsFeed = ({ news, apiKey, setApiKey }) => {
	return (
		<section className='news-feed'>
			{news.length > 0 ? <ul className='news-list'>
				{news.map((news, index) => (
					<li key={index} className='news-list-item'>
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
				))}
			</ul> : <Input Legend={InputLegend} value={apiKey} placeholder={"Please, input your API key"} onChange={setApiKey} />
			}
		</section>
	);
};

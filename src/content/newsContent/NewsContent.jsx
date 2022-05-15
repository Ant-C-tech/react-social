import './newsContent.css';

import { useState, useEffect } from 'react'
import Axios from 'axios'

import { News } from './news/News';
import { ApiKeyInput } from '../../components/common/apiKeyInput/ApiKeyInput';

export const NewsContent = () => {
	const [apiKey, setApiKey] = useState('')
	const [news, setNews] = useState([])

	useEffect(() => {
		const getNews = async () => {
			const news = await Axios.get(`https://newsdata.io/api/1/news?apikey=${apiKey}`)
			setNews(news.data.results)
		}

		if (apiKey.length > 0 && news.length === 0) {
			getNews()
		}
	}, [apiKey, news]);

	useEffect(() => {
		if (news.length > 0) {
			console.log(news);
		}
	}, [news]);

	return (
		<section className='news-content'>
			{news.length > 0 ? <ul className='news-list'>
				{news.map((news, index) => (
					<li key={index} className='news-list-item'>
						<News
							category={news.category}
							countries={news.country}
							title={news.title}
							image={news.image_url}
							text={news.description}
							pubDate={news.pubDate}
						/>
					</li>
				))}
			</ul> : <ApiKeyInput APIkeyFor='news' apiKey={apiKey} setApiKey={setApiKey} />
			}
		</section>
	);
};

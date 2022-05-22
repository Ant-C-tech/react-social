import './newsPage.css';

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControl } from './newsControl/NewsControl';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')
	const [news, setNews] = useState([])
	const [message, setMessage] = useState({})
	const [selectedCountry, setSelectedCountry] = useState("");

	const fetchNews = useCallback(async () => {
		try {
			const response = await axios.get('news', {
				baseURL: 'https://newsdata.io/api/1',
				params: {
					'apikey': apiKey
				}
			})
			if (response && response.data) {
				setNews(response.data.results)
			}
		} catch (error) {
			if (error.response) {
				setMessage({ type: 'warning', title: error.code, text: error.message })
			} else if (error.request) {
				setMessage({ type: 'warning', title: error.code, text: error.message })
			} else {
				setMessage({ type: 'warning', title: error.code, text: error.message })
			}
		}
	}, [apiKey])

	useEffect(() => {
		setMessage({})
	}, [apiKey])

	useEffect(() => {
		if (apiKey && news.length === 0) {
			fetchNews()
		}
	}, [apiKey, news, fetchNews]);

	useEffect(() => {
		if (news.length > 0) {
			console.log(news);
		}
	}, [news]);

	return (<>
		<section className='content-container'>
			<NewsFeed news={news} apiKey={apiKey} setApiKey={setApiKey} />
		</section>
		<RightBar content={<NewsControl message={message} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />} />
	</>)
};

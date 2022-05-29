import './newsPage.css';

import { useState, useEffect, useCallback } from 'react'

import { isMessage } from "../../services/isMessage"
import { apiClient } from '../../services/apiClient';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControl } from './newsControl/NewsControl';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')
	const [message, setMessage] = useState({})

	const [news, setNews] = useState([])
	const [selectedCountry, setSelectedCountry] = useState("");

	const fetchNews = useCallback(async () => {
		try {

			const client = apiClient({
				method: 'get',
				baseURL: 'https://newsdata.io/api/1/news',
				params: {
					'apikey': apiKey,
					'country': selectedCountry ? selectedCountry.toLowerCase() : null
				}
			})
			const response = await client()

			if (response) {
				setNews(response.data.results)
			}
		} catch (error) {
			setMessage({ type: 'warning', title: error.message, text: 'Please, use correct API Key' })
		}
	}, [apiKey, selectedCountry])

	useEffect(() => {
		setMessage({})
	}, [apiKey, selectedCountry])

	useEffect(() => {
		apiKey && fetchNews()
	}, [apiKey, selectedCountry, fetchNews]);

	// In develop purpose
	useEffect(() => {
		if (news.length > 0) {
			console.log(news);
		}
	}, [news]);
	// End of In develop purpose

	return (<>
		<section className='content-container'>
			<NewsFeed news={news} apiKey={apiKey} setApiKey={setApiKey} />
		</section>
		<RightBar content={news.length > 0 || isMessage(message) ? <NewsControl news={news} message={message} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} /> : null} />
	</>)
};

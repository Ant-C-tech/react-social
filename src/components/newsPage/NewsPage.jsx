import './newsPage.css';

import { useState, useEffect, useCallback } from 'react'

import { getNews } from '../../businessLogic/news/getNews';
import { createErrorMessage } from '../../businessLogic/news/createErrorMessage';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControl } from './newsControl/NewsControl';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')
	const [error, setError] = useState('')

	const [news, setNews] = useState([])
	const [selectedCountry, setSelectedCountry] = useState(["US"]);

	//Avoid multiple requests for
	const [requestCounter, setRequestCounter] = useState(0)

	const fetchNews = useCallback(async () => {
		try {
			const response = await getNews(apiKey, selectedCountry)
			if (response) {
				//Avoid multiple requests for
				setRequestCounter(requestCounter => requestCounter + 1)
				setNews(response.data.results)
			}
		} catch (error) {
			setError(error.message)
		}
	}, [apiKey, selectedCountry])

	useEffect(() => {
		setError('')
	}, [apiKey, selectedCountry])

	useEffect(() => {
		apiKey && fetchNews()
		console.log('work fetchNews');
	}, [apiKey, selectedCountry, fetchNews]);

	// In develop purpose
	useEffect(() => {
		if (news.length > 0) {
			console.log(news);
		}
	}, [news]);

	//Avoid multiple requests for
	useEffect(() => {
		if (requestCounter > 3) {
			setApiKey('')
			console.log('Multiple Request Happened!');
		}
	}, [requestCounter])
	// End of In develop purpose

	return (<>
		<section className='content-container'>
			<NewsFeed news={news} apiKey={apiKey} setApiKey={setApiKey} />
		</section>
		<RightBar content={news.length > 0 || error ? <NewsControl news={news} message={error && createErrorMessage(news, error)} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} /> : null} />
	</>)
};

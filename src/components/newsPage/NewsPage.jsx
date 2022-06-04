import './newsPage.css';

import { useState, useEffect, useCallback } from 'react'

// import { isEmptyObject } from "../../services/isEmptyObject"
import { apiClient } from '../../services/apiClient';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControl } from './newsControl/NewsControl';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')
	// const [message, setMessage] = useState({})
	const [error, setError] = useState('')

	const [news, setNews] = useState([])
	const [selectedCountry, setSelectedCountry] = useState("");

	//Avoid multiple requests for
	const [requestCounter, setRequestCounter] = useState(0)

	const createErrorMessage = () => {
		if (news.length === 0) {
			return { type: 'warning', title: error, text: 'Please, use correct API Key' }
		} else {
			return { type: 'warning', title: error, text: 'Please, use correct parameters' }
		}
	}

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
				//Avoid multiple requests for
				setRequestCounter(requestCounter => requestCounter + 1)
				setNews(response.data.results)
			}
		} catch (error) {
			setError(error.message)
		}
	}, [apiKey, selectedCountry])

	useEffect(() => {
		// setMessage({})
		setError('')
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
		<RightBar content={news.length > 0 || error ? <NewsControl news={news} message={error && createErrorMessage()} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} /> : null} />
	</>)
};

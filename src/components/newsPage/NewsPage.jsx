import './newsPage.css';

import { useState, useEffect, useCallback } from 'react'
// import axios from 'axios';

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

	// const fetchNews = useCallback(async () => {
	// 	try {
	// 		const response = await axios({
	// 			method: 'get',
	// 			baseURL: 'https://newsdata.io/api/1/news',
	// 			params: {
	// 				'apikey': apiKey,
	// 				'country': selectedCountry ? selectedCountry.toLowerCase() : null
	// 			}
	// 		})
	// 		if (response && response.data) {
	// 			setNews(response.data.results)
	// 		}
	// 	} catch (error) {
	// 		if (error.response) {
	// 			console.log(error.response.status);
	// 			console.log(error.response.statusText);
	// 			console.log(error.message);
	// 			console.log(error.response.headers);
	// 			console.log(error.response.data);
	// 			console.log({...error});

	// 			setMessage({ type: 'warning', title: error.code, text: error.message })
	// 		} else if (error.request) {
	// 			setMessage({ type: 'warning', title: error.code, text: error.message })
	// 		} else {
	// 			setMessage({ type: 'warning', title: error.code, text: error.message })
	// 		}
	// 	}
	// }, [apiKey, selectedCountry])

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
			console.log('error from News', error.toJSON())
			setMessage({ type: 'warning', title: error.code, text: error.message })
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

	useEffect(() => {
		console.log(selectedCountry);
	}, [selectedCountry]);
	// End of In develop purpose

	return (<>
		<section className='content-container'>
			<NewsFeed news={news} apiKey={apiKey} setApiKey={setApiKey} />
		</section>
		<RightBar content={news.length > 0 || isMessage(message) ? <NewsControl news={news} message={message} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} /> : null} />
	</>)
};

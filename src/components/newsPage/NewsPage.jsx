import './newsPage.css';

import { useState, useEffect, useRef, useCallback } from 'react'

import { getNews } from '../../businessLogic/news/getNews';
import { createErrorMessage } from '../../businessLogic/news/createErrorMessage';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControl } from './newsControl/NewsControl';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [needMoreNews, setNeedMoreNews] = useState(false)

	const [news, setNews] = useState([])
	const [selectedCountries, setSelectedCountries] = useState(["US"]);
	const [nextPage, setNextPage] = useState(0)

	//Avoid multiple requests for
	const [requestCounter, setRequestCounter] = useState(0)

	useEffect(() => {
		setError('')
	}, [apiKey, selectedCountries])

	useEffect(() => {
		const getDefaultNews = async () => {
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)
					setNews(response.data.results)
					setNextPage(response.data.nextPage)
				}
				setLoading(false)
			} catch (error) {
				setError(error.message)
			}
		}

		apiKey && getDefaultNews()
	}, [apiKey, selectedCountries]);

	useEffect(() => {
		const getMoreNews = async () => {
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries, nextPage)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)
					setNews((news) => { return [...new Set([...news, ...response.data.results])] })
					setNextPage(response.data.nextPage)
				}
				setLoading(false)
				setNeedMoreNews(false)
			} catch (error) {
				setError(error.message)
			}
		}

		if (needMoreNews) {
			getMoreNews()
		}
	}, [apiKey, selectedCountries, nextPage, needMoreNews])

	// In develop purpose
	useEffect(() => {
		if (news.length > 0) {
			console.log(news);
		}
	}, [news]);

	//Avoid multiple requests for
	useEffect(() => {
		if (requestCounter > 5) {
			setApiKey('')
			console.log('Multiple Request Happened!');
		}
	}, [requestCounter])
	// End of In develop purpose

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
	}, [loading])

	return (<>
		<section className='content-container'>
			<NewsFeed newsSet={news} apiKey={apiKey} setApiKey={setApiKey} lastNewsRef={lastNewsRef} />
		</section>
		<RightBar content={news.length > 0 || error ? <NewsControl news={news} message={error && createErrorMessage(news, error)} selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} /> : null} />
	</>)
};

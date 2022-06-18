import './newsPage.css';

import { useState, useEffect, useRef, useCallback } from 'react'
import { DebounceInput } from 'react-debounce-input';

import { getNews } from './businessLogic/getNews';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControls } from './newsControls/NewsControls';
import { NoApiKeyTextMessage } from './noApiKeyTextMessage/NoApiKeyTextMessage';
import { Message } from '../common/message/Message';

const defaultCountry = 'us';
const defaultCategory = 'top';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')

	const [nextPage, setNextPage] = useState(0)
	const [totalResults, setTotalResults] = useState(1)
	const [needMoreNews, setNeedMoreNews] = useState(false)
	const [hasMoreNews, setHasMoreNews] = useState(true)

	const [selectedCountries, setSelectedCountries] = useState([defaultCountry]);
	const [selectedCategories, setSelectedCategories] = useState([defaultCategory]);

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const [news, setNews] = useState([])


	//Avoid multiple requests for
	const [requestCounter, setRequestCounter] = useState(0)

	useEffect(() => {
		setError('')
		setNextPage(0)
	}, [apiKey, selectedCountries])

	const newsFeedRef = useRef(null)
	useEffect(() => {
		newsFeedRef.current && newsFeedRef.current.scrollIntoView({ block: "start" });
	}, [selectedCountries])

	useEffect(() => {
		if (news.length < totalResults) {
			setHasMoreNews(true)
		} else {
			setHasMoreNews(false)
		}
	}, [news, totalResults]);

	useEffect(() => {
		const getDefaultNews = async () => {
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries, selectedCategories, 0)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)

					setNews(response.data.results)

					setNextPage(response.data.nextPage)
					setTotalResults(response.data.totalResults)
				}
				setLoading(false)
			} catch (error) {
				setError(error.message)
			}
		}

		apiKey && getDefaultNews()
	}, [apiKey, selectedCountries, selectedCategories]);

	useEffect(() => {
		const getMoreNews = async () => {
			setNeedMoreNews(false)
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries, selectedCategories, nextPage)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)

					setNextPage(response.data.nextPage)
					setTotalResults(response.data.totalResults)

					setNews((news) => { return [...new Set([...news, ...response.data.results])] })
				}
				setLoading(false)

			} catch (error) {
				setError(error.message)
			}
		}

		if (needMoreNews && hasMoreNews) {
			getMoreNews()
		}
	}, [apiKey, selectedCountries, selectedCategories, nextPage, needMoreNews, hasMoreNews])

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
			{apiKey && !error ?
				<NewsFeed newsSet={news}
					lastNewsRef={lastNewsRef}
					newsFeedRef={newsFeedRef} />
				:
				<Message type={'info'} title={'You need API key for getting news.'}>
					<NoApiKeyTextMessage />
					<DebounceInput
						type="text"
						minLength={2}
						debounceTimeout={500}
						placeholder={"Please, input your API key"}
						value={apiKey}
						onChange={(event) => setApiKey(event.target.value)} />
				</Message>
			}
		</section>
		<RightBar
			content={(apiKey || error) &&
				<NewsControls
					news={news}
					error={error}
					selectedCountries={selectedCountries}
					setSelectedCountries={setSelectedCountries}
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories} />} />
	</>)
};

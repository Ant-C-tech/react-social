import './news.css';

import { useState, useEffect } from 'react'

import { getNews } from './businessLogic/getNews';

import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { NewsControls } from './newsControls/NewsControls';
import { NoApiKeyTextMessage } from './noApiKeyTextMessage/NoApiKeyTextMessage';
import { Message } from '../../components/common/message/Message';
import { InputComponent } from '../../components/common/inputComponent/InputComponent';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const News = () => {
	const [apiKey, setApiKey] = useLocalStorage('apiKey', '')

	const [nextPage, setNextPage] = useState(0)
	const [totalResults, setTotalResults] = useState(1)
	const [needMoreNews, setNeedMoreNews] = useState(false)
	const [hasMoreNews, setHasMoreNews] = useState(true)
	const [focusNewsIndex, setFocusNewsIndex] = useState(0)

	const [selectedCountries, setSelectedCountries] = useLocalStorage('defaultCountry', ['all']);
	const [selectedCategories, setSelectedCategories] = useLocalStorage('defaultCategory', ['all']);
	const [selectedLanguages, setSelectedLanguages] = useLocalStorage('defaultLanguage', ['all']);
	const [keyword, setKeyword] = useLocalStorage('keyword', '')

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const [news, setNews] = useState([])

	//Avoid multiple requests for
	const [requestCounter, setRequestCounter] = useState(0)

	useEffect(() => {
		setError('')
		setNextPage(0)
	}, [apiKey, selectedCountries])

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
				const response = await getNews(apiKey, selectedCountries, selectedCategories, selectedLanguages, keyword, 0)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)

					setNews(response.data.results)
					setFocusNewsIndex(0)

					setNextPage(response.data.nextPage)
					setTotalResults(response.data.totalResults)
				}
				setLoading(false)
			} catch (error) {
				setError(error.message)
				setLoading(false)
			}
		}

		if (apiKey) {
			getDefaultNews()
		}
	}, [apiKey, selectedCountries, selectedCategories, selectedLanguages, keyword]);

	useEffect(() => {
		const getMoreNews = async () => {
			setNeedMoreNews(false)
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries, selectedCategories, selectedLanguages, keyword, nextPage)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)

					const prevFocusNews = news.length

					setNextPage(response.data.nextPage)
					setTotalResults(response.data.totalResults)

					setNews((news) => { return [...new Set([...news, ...response.data.results])] })

					setFocusNewsIndex(prevFocusNews - 2)
				}
				setLoading(false)

			} catch (error) {
				setError(error.message)
				setLoading(false)
			}
		}

		if (needMoreNews && hasMoreNews) {
			getMoreNews()
		}
	}, [apiKey, selectedCountries, selectedCategories, selectedLanguages, nextPage, needMoreNews, hasMoreNews, keyword, news.length])

	//Avoid multiple requests for
	useEffect(() => {
		if (requestCounter > 20) {
			setApiKey('')
			console.log('Multiple Request Happened!');
		}
	}, [requestCounter, setApiKey])
	// End of In develop purpose

	return (
		<>
			<section className='content-container'>
				{apiKey && !error ?
					<NewsFeed
						loading={loading}
						newsSet={news}
						keywords={[keyword]}
						focusNewsIndex={focusNewsIndex}
						setFocusNewsIndex={setFocusNewsIndex}
						setNeedMoreNews={setNeedMoreNews}
					/>
					:
					<Message type={'info'} title={'You need API key for getting news.'}>
						<NoApiKeyTextMessage />
						<InputComponent type="text"
							minLength={2}
							debounceTimeout={1000}
							placeholder={"Please, input your API key"}
							value={apiKey}
							setValue={setApiKey} />
					</Message>
				}
			</section>
			<ControlBar
				content={(apiKey || error) &&
					<NewsControls
						news={news}
						error={error}
						selectedCountries={selectedCountries}
						setSelectedCountries={setSelectedCountries}
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
						selectedLanguages={selectedLanguages}
						setSelectedLanguages={setSelectedLanguages}
						keyword={keyword}
						setKeyword={setKeyword}
						loading={loading} />} />
		</>
	)
};

import { useState, useEffect } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { NewsControls } from '../../components/common/newsControls/NewsControls';
import { NoFavoriteNewsMessage } from './noFavoriteNewsMessage/NoFavoriteNewsMessage';
import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { NothingWasFoundMessage } from '../../components/common/nothingWasFoundMessage/NothingWasFoundMessage';

import { getCountriesAvailableForFilterFavoriteNews } from './utils/getCountriesAvailableForFilterFavoriteNews';
import { getNewsFilteredByCountry } from './utils/getNewsFilteredByCountry';
import { updateNewsControls } from './utils/updateNewsControls';


export const FavoriteNews = () => {
  const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', [])
  const [news, setNews] = useState([])

  const [startNews, setStartNews] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [needMoreNews, setNeedMoreNews] = useState(false)
  const [hasMoreNews, setHasMoreNews] = useState(true)
  const [needScroll, setNeedScroll] = useState(false)

  const [selectedCountries, setSelectedCountries] = useState(['all']);
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedLanguages, setSelectedLanguages] = useState(['all']);
  const [keyword, setKeyword] = useState('')

  const newsForPage = 10

  const minParametersLength = 1
  const maxParametersLength = 5

  useEffect(() => {
    const newsFilteredByCountry = selectedCountries[0] === 'all' ?
      favoriteNews :
      getNewsFilteredByCountry(favoriteNews, selectedCountries)

    const newsFilteredByPage = [...newsFilteredByCountry.filter((_currentNewsFilteredByCountry, index) => index < currentPage * newsForPage)]
    setNews(newsFilteredByPage)

    if (newsFilteredByPage.length < newsFilteredByCountry.length) {
      setHasMoreNews(true)
    } else {
      setHasMoreNews(false)
    }
  }, [favoriteNews, currentPage, selectedCountries])

  useEffect(() => {
    setNeedScroll(true)
    setStartNews(0)
  }, [selectedCountries])

  useEffect(() => {
    if (favoriteNews.length > 0) {
      const countriesAvailableForFilterFavoriteNews = getCountriesAvailableForFilterFavoriteNews(favoriteNews)
      if (selectedCountries.length > countriesAvailableForFilterFavoriteNews.length - 1) {
        updateNewsControls(
          selectedCountries,
          countriesAvailableForFilterFavoriteNews,
          setSelectedCountries
        )
      }
      if (selectedCountries.length === 1 &&
        !countriesAvailableForFilterFavoriteNews.includes(selectedCountries[0])) {
        updateNewsControls(
          selectedCountries,
          countriesAvailableForFilterFavoriteNews,
          setSelectedCountries
        )
      }
    }
  }, [favoriteNews, selectedCountries])

  useEffect(() => {
    if (needMoreNews && hasMoreNews) {
      setCurrentPage(page => page + 1)
      setNews([...favoriteNews.filter((_currentFavoriteNews, index) => index < currentPage * newsForPage)])
    }
  }, [needMoreNews, hasMoreNews, currentPage, favoriteNews]);

  return (
    <>
      <section className='content-container'>
        {<NewsFeed
          newsSet={news}
          favoriteNews={favoriteNews}
          setFavoriteNews={setFavoriteNews}
          keywords={['']}
          startNews={startNews}
          loading={false}
          setNeedMoreNews={setNeedMoreNews}
          needScroll={needScroll}
          setNeedScroll={setNeedScroll}
          message={favoriteNews.length === 0 ?
            <NoFavoriteNewsMessage /> : news.length === 0 ?
              <NothingWasFoundMessage /> : null}
        />
        }
      </section>
      <ControlBar
        content={favoriteNews.length > 0 &&
          <NewsControls
            news={news}
            error={''}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            keyword={keyword}
            setKeyword={setKeyword}
            loading={false}
            countriesAvailableForFilterNews={getCountriesAvailableForFilterFavoriteNews(favoriteNews)}
            minCountriesAvailableForFilterNews={minParametersLength}
            maxCountriesAvailableForFilterNews={
              getCountriesAvailableForFilterFavoriteNews(favoriteNews).length - 1 > maxParametersLength ? maxParametersLength :
                getCountriesAvailableForFilterFavoriteNews(favoriteNews).length - 1
            }
          />
        } />
    </>
  )
};

import { useState, useEffect } from 'react'
import { NewsControls } from '../../components/common/newsControls/NewsControls';
import { getCountriesAvailableForFilterFavoriteNews } from '../../components/common/newsControls/utils/getCountriesAvailableForFilterFavoriteNews';
import { updateNewsControls } from '../../components/common/newsControls/utils/updateNewsControls';

import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { NothingWasFoundMessage } from '../../components/common/nothingWasFoundMessage/NothingWasFoundMessage';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { NoFavoriteNewsMessage } from './noFavoriteNewsMessage/NoFavoriteNewsMessage';

export const FavoriteNews = () => {
  const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', [])
  const [news, setNews] = useState([])

  const [startNews, setStartNews] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [needMoreNews, setNeedMoreNews] = useState(false)
  const [hasMoreNews, setHasMoreNews] = useState(true)

  const [selectedCountries, setSelectedCountries] = useState(['all']);
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedLanguages, setSelectedLanguages] = useState(['all']);
  const [keyword, setKeyword] = useState('')

  const newsForPage = 10

  const minParametersLength = 1
  const maxParametersLength = 5

  useEffect(() => {
    setNews([...favoriteNews.filter((_currentFavoriteNews, index) => index < currentPage * newsForPage)])
  }, [favoriteNews, currentPage])

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
    if (news.length < favoriteNews.length) {
      setHasMoreNews(true)
    } else {
      setHasMoreNews(false)
    }
  }, [news.length, favoriteNews.length]);

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
          setStartNews={setStartNews}
          loading={false}
          setNeedMoreNews={setNeedMoreNews}
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
            maxCountriesAvailableForFilterNews={getCountriesAvailableForFilterFavoriteNews(favoriteNews).length - 1 > maxParametersLength ? maxParametersLength : getCountriesAvailableForFilterFavoriteNews(favoriteNews).length - 1}
          />
        } />
    </>
  )
};

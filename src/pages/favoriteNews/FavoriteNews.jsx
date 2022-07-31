import { useState, useEffect } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { NewsControls } from '../../components/common/newsControls/NewsControls';
import { NoFavoriteNewsMessage } from './noFavoriteNewsMessage/NoFavoriteNewsMessage';
import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { NothingWasFoundMessage } from '../../components/common/nothingWasFoundMessage/NothingWasFoundMessage';

import { getCountriesAvailableForFilterFavoriteNews } from './utils/getCountriesAvailableForFilterFavoriteNews';
import { getNewsFilteredByCountry } from './utils/getNewsFilteredByCountry';
import { getNewsSortByDate } from './utils/getNewsSortByDate';
import { getCategoriesAvailableForFilterFavoriteNews } from './utils/getCategoriesAvailableForFilterFavoriteNews';
import { getCategoriesObject } from './utils/getCategoriesObject';
import { getNewsFilteredByCategory } from './utils/getNewsFilteredByCategory';


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

    // Manage scroll
  useEffect(() => {
    setNeedScroll(true)
    setStartNews(0)
    setCurrentPage(1)
    setNeedMoreNews(false)
  }, [selectedCountries, selectedCategories])

  // Filtering news
  useEffect(() => {
    const newsFilteredByCountry = selectedCountries[0] === 'all' ?
      favoriteNews :
      getNewsFilteredByCountry(favoriteNews, selectedCountries)

    const newsFilteredByCategory = selectedCategories[0] === 'all' ?
      newsFilteredByCountry :
      getNewsFilteredByCategory(newsFilteredByCountry, selectedCategories)

    const newsSortedByDate = getNewsSortByDate(newsFilteredByCategory)

    console.log(currentPage);

    const newsFilteredByPage = [...newsSortedByDate.filter((_currentNewsFilteredByCountry, index) => index < currentPage * newsForPage)]
    setNews(newsFilteredByPage)

    if (newsFilteredByPage.length < newsFilteredByCategory.length) {
      setHasMoreNews(true)
    } else {
      setHasMoreNews(false)
    }
  }, [favoriteNews, currentPage, selectedCountries, selectedCategories])

  // Manage of News Controls
  useEffect(() => {
    const countriesAvailableForFilterFavoriteNews = getCountriesAvailableForFilterFavoriteNews(favoriteNews)
    setSelectedCountries((prevSelectedCountries) => [...prevSelectedCountries.filter((country) => countriesAvailableForFilterFavoriteNews.includes(country))].length > 0 ?
      [...prevSelectedCountries.filter((country) => countriesAvailableForFilterFavoriteNews.includes(country))] :
      ['all']
    )

    const categoriesAvailableForFilterFavoriteNews = getCategoriesAvailableForFilterFavoriteNews(favoriteNews)
    setSelectedCategories((prevSelectedCategories) =>
      [...prevSelectedCategories.filter((category) => categoriesAvailableForFilterFavoriteNews.includes(category))].length > 0 ?
        [...prevSelectedCategories.filter((category) => categoriesAvailableForFilterFavoriteNews.includes(category))] :
        ['all'])

    // Prevent changing needScroll state on first load
    setNeedScroll(false)
  }, [favoriteNews])

  // Get more news
  useEffect(() => {
    if (needMoreNews && hasMoreNews) {
      setCurrentPage(page => page + 1)
    }
  }, [needMoreNews, hasMoreNews, favoriteNews]);

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
            categoriesAvailableForFilterNews={getCategoriesObject(getCategoriesAvailableForFilterFavoriteNews(favoriteNews))}
            minCategoriesAvailableForFilterNews={minParametersLength}
            maxCategoriesAvailableForFilterNews={
              getCategoriesAvailableForFilterFavoriteNews(favoriteNews).length - 1 > maxParametersLength ? maxParametersLength :
                getCategoriesAvailableForFilterFavoriteNews(favoriteNews).length - 1
            }
          />
        } />
    </>
  )
};

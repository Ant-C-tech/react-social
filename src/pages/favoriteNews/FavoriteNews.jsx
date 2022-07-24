import { useState, useEffect } from 'react'

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

  const newsForPage = 10

  useEffect(() => {
    setNews([...favoriteNews.filter((_currentFavoriteNews, index) => index < currentPage * newsForPage)])
  }, [favoriteNews, currentPage])

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
      <ControlBar />
    </>
  )
};

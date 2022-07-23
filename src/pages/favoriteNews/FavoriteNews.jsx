import { useState } from 'react'

import { Message } from '../../components/common/message/Message';
import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const FavoriteNews = () => {
  const [startNews, setStartNews] = useState(0)
  const [needMoreNews, setNeedMoreNews] = useState(false)

  const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', [])

  return (
    <>
      <section className='content-container'>
        {favoriteNews ?
          <NewsFeed
            newsSet={favoriteNews}
            favoriteNews={favoriteNews}
            setFavoriteNews={setFavoriteNews}
            keywords={['']}
            startNews={startNews}
            setStartNews={setStartNews}
            loading={false}
            setNeedMoreNews={setNeedMoreNews}
          />
          :
          <Message type={'info'} title={'There is no favorite news yet.'}> </Message>
        }
      </section>
      <ControlBar />
    </>
  )
};

import { Message } from '../../components/common/message/Message';
import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const FavoriteNews = () => {
  const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', [])

  return (
    <>
      <section className='content-container'>
        {favoriteNews ?
          <NewsFeed
          //   newsSet={favoriteNews}
          //   // focusNewsIndex={focusNewsIndex}
          //   // setFocusNewsIndex={setFocusNewsIndex}
          //   // setNeedMoreNews={setNeedMoreNews}
          />
          // <h2>Test</h2>
          :
          <Message type={'info'} title={'No favorite news yet.'}> </Message>
        }
      </section>
      <ControlBar />
    </>
  )
};

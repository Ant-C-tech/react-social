import { getIndexOfTargetNews } from './getIndexOfTargetNews';

export const addNote = (favoriteNews, setFavoriteNews, link, targetPart) => {
  const indexOfTargetNews = getIndexOfTargetNews(favoriteNews, link);
  console.log(indexOfTargetNews);
};

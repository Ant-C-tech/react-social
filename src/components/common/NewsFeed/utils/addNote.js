import { getIndexOfTargetNews } from './getIndexOfTargetNews';

export const addNote = (
  favoriteNews,
  setFavoriteNews,
  activeTool,
  keywords,
  link,
  targetPart,
) => {
  const indexOfTargetNews = getIndexOfTargetNews(favoriteNews, link);

  // console.log(targetPart);

  // let rng = document.createRange();
  // rng.selectNode(p);

  let onMouseDownTargetText;
  if (
    (favoriteNews[indexOfTargetNews].highlights &&
      favoriteNews[indexOfTargetNews].highlights[targetPart]) ||
    keywords[0].length > 0
  ) {
    onMouseDownTargetText =
      window.getSelection().anchorNode.parentElement.textContent;
  } else {
    onMouseDownTargetText = window.getSelection().baseNode.textContent;
  }

  // console.log(onMouseDownTargetText);

  console.log(window.getSelection());
  console.log(window.getSelection().anchorOffset);
  console.log(favoriteNews);
};

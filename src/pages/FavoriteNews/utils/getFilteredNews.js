import {
  getNewsFilteredByCountry,
  getNewsFilteredByCategory,
  getNewsFilteredByLanguage,
  getNewsFilteredByKeyword,
  getNewsSortByDate,
} from './';

export const getFilteredNews = (
  favoriteNews,
  selectedCountries,
  selectedCategories,
  selectedLanguages,
  keyword,
  currentPage,
  newsForPage,
  setNewsToShow,
  setHasMoreNews,
) => {
  const newsFilteredByCountry =
    selectedCountries[0] === 'all'
      ? favoriteNews
      : getNewsFilteredByCountry(favoriteNews, selectedCountries);

  const newsFilteredByCategory =
    selectedCategories[0] === 'all'
      ? newsFilteredByCountry
      : getNewsFilteredByCategory(newsFilteredByCountry, selectedCategories);

  const newsFilteredByLanguage =
    selectedLanguages[0] === 'all'
      ? newsFilteredByCategory
      : getNewsFilteredByLanguage(newsFilteredByCategory, selectedLanguages);

  const newsFilteredByKeyword =
    keyword.length === 0
      ? newsFilteredByLanguage
      : getNewsFilteredByKeyword(newsFilteredByLanguage, keyword);

  const newsSortedByDate = getNewsSortByDate(newsFilteredByKeyword);

  const newsFilteredByPage = [
    ...newsSortedByDate.filter(
      (_currentNewsFilteredByCountry, index) =>
        index < currentPage * newsForPage,
    ),
  ];
  setNewsToShow(newsFilteredByPage);

  if (newsFilteredByPage.length < newsFilteredByLanguage.length) {
    setHasMoreNews(true);
  } else {
    setHasMoreNews(false);
  }
};

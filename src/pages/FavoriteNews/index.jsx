import { useState, useEffect } from 'react';

import { useLocalStorage } from '@hooks/useLocalStorage';

import {
  getActualizatedCategoriesObject,
  getLanguagesObject,
  getFilteredNews,
  updateAvailableParametersForFiltering,
} from './utils';

import { ControlBar, Content } from '@sections';

import { NewsControls, NewsFeed, NothingWasFoundMessage } from '@common';

import { NoFavoriteNewsMessage } from './NoFavoriteNewsMessage';

export const FavoriteNews = () => {
  const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', []);
  const [news, setNews] = useState([]);

  const [startNews, setStartNews] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [needMoreNews, setNeedMoreNews] = useState(false);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [needScroll, setNeedScroll] = useState(false);

  const [selectedCountries, setSelectedCountries] = useState(['all']);
  const [
    countriesAvailableForFilterFavoriteNews,
    setCountriesAvailableForFilterFavoriteNews,
  ] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [
    categoriesAvailableForFilterFavoriteNews,
    setCategoriesAvailableForFilterFavoriteNews,
  ] = useState([]);

  const [selectedLanguages, setSelectedLanguages] = useState(['all']);
  const [
    languagesAvailableForFilterFavoriteNews,
    setLanguagesAvailableForFilterFavoriteNews,
  ] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [activeTool, setActiveTool] = useState('');

  const newsForPage = 10;

  const minParametersLength = 1;
  const maxParametersLength = 5;

  // Manage scroll
  useEffect(() => {
    setNeedScroll(true);
    setStartNews(0);
    setCurrentPage(1);
    setNeedMoreNews(false);
  }, [selectedCountries, selectedCategories, selectedLanguages, keyword]);

  // Filtering news
  useEffect(() => {
    getFilteredNews(
      favoriteNews,
      selectedCountries,
      selectedCategories,
      selectedLanguages,
      keyword,
      currentPage,
      newsForPage,
      setNews,
      setHasMoreNews,
    );
  }, [
    favoriteNews,
    currentPage,
    selectedCountries,
    selectedCategories,
    selectedLanguages,
    keyword,
  ]);

  // Manage of News Controls
  useEffect(() => {
    updateAvailableParametersForFiltering(
      favoriteNews,
      selectedCountries,
      selectedCategories,
      selectedLanguages,
      setCountriesAvailableForFilterFavoriteNews,
      setCategoriesAvailableForFilterFavoriteNews,
      setLanguagesAvailableForFilterFavoriteNews,
    );
  }, [favoriteNews, selectedCategories, selectedCountries, selectedLanguages]);

  // If user starts with search
  useEffect(() => {
    if (
      keyword.length > 0 &&
      selectedCountries[0] === 'all' &&
      selectedCategories[0] === 'all' &&
      selectedLanguages[0] === 'all'
    ) {
      updateAvailableParametersForFiltering(
        news,
        selectedCountries,
        selectedCategories,
        selectedLanguages,
        setCountriesAvailableForFilterFavoriteNews,
        setCategoriesAvailableForFilterFavoriteNews,
        setLanguagesAvailableForFilterFavoriteNews,
      );
    }
  }, [keyword, selectedCategories, selectedCountries, selectedLanguages, news]);

  // Update available filter parameters if news was removed from favorite
  useEffect(() => {
    if (
      countriesAvailableForFilterFavoriteNews.length > 0 &&
      selectedCountries.filter(
        (country) => !countriesAvailableForFilterFavoriteNews.includes(country),
      ).length > 0
    ) {
      setSelectedCountries(
        selectedCountries.filter((country) =>
          countriesAvailableForFilterFavoriteNews.includes(country),
        ).length > 0
          ? selectedCountries.filter((country) =>
              countriesAvailableForFilterFavoriteNews.includes(country),
            )
          : ['all'],
      );
    }

    if (
      categoriesAvailableForFilterFavoriteNews.length > 0 &&
      selectedCategories.filter(
        (category) =>
          !categoriesAvailableForFilterFavoriteNews.includes(category),
      ).length > 0
    ) {
      setSelectedCategories(
        selectedCategories.filter((category) =>
          categoriesAvailableForFilterFavoriteNews.includes(category),
        ).length > 0
          ? selectedCategories.filter((category) =>
              categoriesAvailableForFilterFavoriteNews.includes(category),
            )
          : ['all'],
      );
    }

    if (
      languagesAvailableForFilterFavoriteNews.length > 0 &&
      selectedLanguages.filter((language) => {
        return !languagesAvailableForFilterFavoriteNews.includes(language);
      }).length > 0
    ) {
      setSelectedLanguages(
        selectedLanguages.filter((language) =>
          languagesAvailableForFilterFavoriteNews.includes(language),
        ).length > 0
          ? selectedLanguages.filter((language) =>
              languagesAvailableForFilterFavoriteNews.includes(language),
            )
          : ['all'],
      );
    }
  }, [
    countriesAvailableForFilterFavoriteNews,
    categoriesAvailableForFilterFavoriteNews,
    languagesAvailableForFilterFavoriteNews,
    selectedCountries,
    selectedCategories,
    selectedLanguages,
  ]);

  // Get more news
  useEffect(() => {
    if (needMoreNews && hasMoreNews) {
      setCurrentPage((page) => page + 1);
      setNeedMoreNews(false);
    }
  }, [needMoreNews, hasMoreNews, favoriteNews]);

  return (
    <>
      <Content>
        {
          <NewsFeed
            newsSet={news}
            favoriteNews={favoriteNews}
            setFavoriteNews={setFavoriteNews}
            keywords={[keyword]}
            startNews={startNews}
            loading={false}
            setNeedMoreNews={setNeedMoreNews}
            needScroll={needScroll}
            setNeedScroll={setNeedScroll}
            message={
              favoriteNews.length === 0 ? (
                <NoFavoriteNewsMessage />
              ) : news.length === 0 ? (
                <NothingWasFoundMessage />
              ) : null
            }
            activeTool={activeTool}
          />
        }
      </Content>
      <ControlBar
        content={
          favoriteNews.length > 0 && (
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
              countriesAvailableForFilterNews={
                countriesAvailableForFilterFavoriteNews
              }
              minCountriesAvailableForFilterNews={minParametersLength}
              maxCountriesAvailableForFilterNews={
                countriesAvailableForFilterFavoriteNews.length - 1 >
                maxParametersLength
                  ? maxParametersLength
                  : countriesAvailableForFilterFavoriteNews.length - 1
              }
              categoriesAvailableForFilterNews={getActualizatedCategoriesObject(
                categoriesAvailableForFilterFavoriteNews,
              )}
              minCategoriesAvailableForFilterNews={minParametersLength}
              maxCategoriesAvailableForFilterNews={
                categoriesAvailableForFilterFavoriteNews.length - 1 >
                maxParametersLength
                  ? maxParametersLength
                  : categoriesAvailableForFilterFavoriteNews.length - 1
              }
              languagesAvailableForFilterNews={getLanguagesObject(
                languagesAvailableForFilterFavoriteNews,
              )}
              minLanguagesAvailableForFilterNews={minParametersLength}
              maxLanguagesAvailableForFilterNews={
                languagesAvailableForFilterFavoriteNews.length - 1 >
                maxParametersLength
                  ? maxParametersLength
                  : languagesAvailableForFilterFavoriteNews.length - 1
              }
              isHighLightersBar={true}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
            />
          )
        }
      />
    </>
  );
};

import React from "react";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";

import {
    getFilteredNews,
    updateAvailableParametersForFiltering,
    getNewsFilteredByKeyword,
    getCountriesForPrompt,
    getCategoriesForPrompt,
    getLanguagesForPrompt,
} from "./utils";

import { ControlBar, Content } from "@sections";
import { NewsControls, NewsFeed, NothingWasFoundMessage } from "@common";
import { NoFavoriteNewsMessage } from "./NoFavoriteNewsMessage";

export const FavoriteNews = () => {
    const [favoriteNews, setFavoriteNews] = useLocalStorage("favoriteNews", []);
    const [newsToShow, setNewsToShow] = useState([]);
    const [newsForPrompt, setNewsForPrompt] = useState([]);

    const [startNews, setStartNews] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [needMoreNews, setNeedMoreNews] = useState(false);
    const [hasMoreNews, setHasMoreNews] = useState(true);
    const [needScroll, setNeedScroll] = useState(false);

    const [selectedCountries, setSelectedCountries] = useState(["all"]);
    const [
        countriesAvailableForFilterFavoriteNews,
        setCountriesAvailableForFilterFavoriteNews,
    ] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState(["all"]);
    const [
        categoriesAvailableForFilterFavoriteNews,
        setCategoriesAvailableForFilterFavoriteNews,
    ] = useState([]);

    const [selectedLanguages, setSelectedLanguages] = useState(["all"]);
    const [
        languagesAvailableForFilterFavoriteNews,
        setLanguagesAvailableForFilterFavoriteNews,
    ] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [activeTool, setActiveTool] = useState(null);
    const [textOfNoteCard, setTextOfNoteCard] = useState("");
    const [openNoteId, setOpenNoteId] = useState("");

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
            setNewsToShow,
            setHasMoreNews
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
            setLanguagesAvailableForFilterFavoriteNews
        );
    }, [
        favoriteNews,
        selectedCategories,
        selectedCountries,
        selectedLanguages,
    ]);

    // Update available filter parameters if news was removed from favorite
    useEffect(() => {
        if (
            countriesAvailableForFilterFavoriteNews.length > 0 &&
            selectedCountries.filter(
                (country) =>
                    !countriesAvailableForFilterFavoriteNews.includes(country)
            ).length > 0
        ) {
            setSelectedCountries(
                selectedCountries.filter((country) =>
                    countriesAvailableForFilterFavoriteNews.includes(country)
                ).length > 0
                    ? selectedCountries.filter((country) =>
                          countriesAvailableForFilterFavoriteNews.includes(
                              country
                          )
                      )
                    : ["all"]
            );
        }

        if (
            categoriesAvailableForFilterFavoriteNews.length > 0 &&
            selectedCategories.filter(
                (category) =>
                    !categoriesAvailableForFilterFavoriteNews.includes(category)
            ).length > 0
        ) {
            setSelectedCategories(
                selectedCategories.filter((category) =>
                    categoriesAvailableForFilterFavoriteNews.includes(category)
                ).length > 0
                    ? selectedCategories.filter((category) =>
                          categoriesAvailableForFilterFavoriteNews.includes(
                              category
                          )
                      )
                    : ["all"]
            );
        }

        if (
            languagesAvailableForFilterFavoriteNews.length > 0 &&
            selectedLanguages.filter((language) => {
                return !languagesAvailableForFilterFavoriteNews.includes(
                    language
                );
            }).length > 0
        ) {
            setSelectedLanguages(
                selectedLanguages.filter((language) =>
                    languagesAvailableForFilterFavoriteNews.includes(language)
                ).length > 0
                    ? selectedLanguages.filter((language) =>
                          languagesAvailableForFilterFavoriteNews.includes(
                              language
                          )
                      )
                    : ["all"]
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

    //Create data for prompt message if nothing was found
    useEffect(() => {
        if (
            (selectedCountries[0] !== "all" ||
                selectedCategories[0] !== "all" ||
                selectedLanguages[0] !== "all") &&
            newsToShow.length === 0
        ) {
            setNewsForPrompt(getNewsFilteredByKeyword(favoriteNews, keyword));
        }
    }, [
        keyword,
        newsToShow,
        favoriteNews,
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
                        newsSet={newsToShow}
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
                            ) : newsToShow.length === 0 ? (
                                <NothingWasFoundMessage
                                    countriesForPrompt={getCountriesForPrompt(
                                        newsForPrompt
                                    )}
                                    categoriesForPrompt={getCategoriesForPrompt(
                                        newsForPrompt
                                    )}
                                    languagesForPrompt={getLanguagesForPrompt(
                                        newsForPrompt
                                    )}
                                />
                            ) : null
                        }
                        activeTool={activeTool}
                        setActiveTool={setActiveTool}
                        textOfNoteCard={textOfNoteCard}
                        setTextOfNoteCard={setTextOfNoteCard}
                        openNoteId={openNoteId}
                        setOpenNoteId={setOpenNoteId}
                        createdFor="favorite news"
                    />
                }
            </Content>
            <ControlBar
                content={
                    favoriteNews.length > 0 && (
                        <NewsControls
                            news={newsToShow}
                            error={""}
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
                            minCountriesAvailableForFilterNews={
                                minParametersLength
                            }
                            maxCountriesAvailableForFilterNews={
                                countriesAvailableForFilterFavoriteNews.length -
                                    1 >
                                    maxParametersLength ||
                                //First render
                                countriesAvailableForFilterFavoriteNews.length ===
                                    0
                                    ? maxParametersLength
                                    : countriesAvailableForFilterFavoriteNews.length -
                                      1
                            }
                            categoriesAvailableForFilterNews={
                                categoriesAvailableForFilterFavoriteNews
                            }
                            minCategoriesAvailableForFilterNews={
                                minParametersLength
                            }
                            maxCategoriesAvailableForFilterNews={
                                categoriesAvailableForFilterFavoriteNews.length -
                                    1 >
                                    maxParametersLength ||
                                //First render
                                categoriesAvailableForFilterFavoriteNews.length ===
                                    0
                                    ? maxParametersLength
                                    : categoriesAvailableForFilterFavoriteNews.length -
                                      1
                            }
                            languagesAvailableForFilterNews={
                                languagesAvailableForFilterFavoriteNews
                            }
                            minLanguagesAvailableForFilterNews={
                                minParametersLength
                            }
                            maxLanguagesAvailableForFilterNews={
                                languagesAvailableForFilterFavoriteNews.length -
                                    1 >
                                    maxParametersLength ||
                                //First render
                                languagesAvailableForFilterFavoriteNews.length ===
                                    0
                                    ? maxParametersLength
                                    : languagesAvailableForFilterFavoriteNews.length -
                                      1
                            }
                            activeTool={activeTool}
                            setActiveTool={setActiveTool}
                            textOfNoteCard={textOfNoteCard}
                            setTextOfNoteCard={setTextOfNoteCard}
                            setOpenNoteId={setOpenNoteId}
                            createdFor="favorite news"
                        />
                    )
                }
            />
        </>
    );
};

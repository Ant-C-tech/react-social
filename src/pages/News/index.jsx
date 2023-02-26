import { fingerPrintIcon } from "@assets";

import React from "react";
import { useState, useEffect } from "react";

import { getNews } from "../../businessLogic/news/getNews";
import { useLocalStorage } from "@hooks/useLocalStorage";

import {
    DEFAULT_CATEGORIES_NAMES,
    DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS,
    WORLD_COUNTRIES_CODE_NAME_DATA,
} from "@constants";

import { ControlBar, Content } from "@sections";

import {
    NewsFeed,
    NewsControls,
    Message,
    InputComponent,
    NothingWasFoundMessage,
} from "@common";

import { NoApiKeyTextMessage } from "./NoApiKeyTextMessage";

export const News = () => {
    const [apiKey, setApiKey] = useLocalStorage("apiKey", "");

    const [nextPage, setNextPage] = useState(null);
    const [totalResults, setTotalResults] = useState(1);
    const [needMoreNews, setNeedMoreNews] = useState(false);
    const [hasMoreNews, setHasMoreNews] = useState(true);
    const [startNews, setStartNews] = useState(0);
    const [needScroll, setNeedScroll] = useState(false);

    const [selectedCountries, setSelectedCountries] = useLocalStorage(
        "defaultCountry",
        ["all"]
    );
    const [selectedCategories, setSelectedCategories] = useLocalStorage(
        "defaultCategory",
        ["all"]
    );
    const [selectedLanguages, setSelectedLanguages] = useLocalStorage(
        "defaultLanguage",
        ["all"]
    );
    const [keyword, setKeyword] = useLocalStorage("keyword", "");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [news, setNews] = useState([]);
    const [favoriteNews, setFavoriteNews] = useLocalStorage("favoriteNews", []);

    const minParametersLength = 1;
    const maxParametersLength = 5;

    //Avoid multiple requests for
    const [requestCounter, setRequestCounter] = useState(0);

    useEffect(() => {
        setError("");
        setNextPage(null);
    }, [apiKey, selectedCountries]);

    useEffect(() => {
        if (news.length < totalResults) {
            setHasMoreNews(true);
        } else {
            setHasMoreNews(false);
        }
    }, [news, totalResults]);

    useEffect(() => {
        const getDefaultNews = async () => {
            try {
                setLoading(true);
                const response = await getNews(
                    apiKey,
                    selectedCountries,
                    selectedCategories,
                    selectedLanguages,
                    keyword,
                    0
                );
                if (response) {
                    //Avoid multiple requests for
                    setRequestCounter((requestCounter) => requestCounter + 1);

                    setNews(response.data.results);
                    setStartNews(0);

                    setNextPage(response.data.nextPage);
                    setTotalResults(response.data.totalResults);
                }
                setLoading(false);
                setNeedScroll(true);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                if (error.message === "Internet Disconnected") {
                    setTimeout(() => {
                        setError("");
                        getDefaultNews();
                    }, 5000);
                }
            }
        };

        if (apiKey) {
            getDefaultNews();
        }
    }, [
        apiKey,
        selectedCountries,
        selectedCategories,
        selectedLanguages,
        keyword,
    ]);

    useEffect(() => {
        const getMoreNews = async () => {
            setNeedMoreNews(false);
            try {
                setLoading(true);
                const response = await getNews(
                    apiKey,
                    selectedCountries,
                    selectedCategories,
                    selectedLanguages,
                    keyword,
                    nextPage
                );
                if (response) {
                    //Avoid multiple requests for
                    setRequestCounter((requestCounter) => requestCounter + 1);

                    const prevStartNews = news.length;

                    setNextPage(response.data.nextPage);
                    setTotalResults(response.data.totalResults);

                    setNews((news) => {
                        return [
                            ...new Set([...news, ...response.data.results]),
                        ];
                    });
                    setStartNews(prevStartNews - 1);
                }
                setLoading(false);
                setNeedScroll(true);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                if (error.message === "Internet Disconnected") {
                    setTimeout(() => {
                        setError("");
                        getMoreNews();
                    }, 5000);
                }
            }
        };

        if (needMoreNews && hasMoreNews) {
            getMoreNews();
        }
    }, [
        apiKey,
        selectedCountries,
        selectedCategories,
        selectedLanguages,
        nextPage,
        needMoreNews,
        hasMoreNews,
        keyword,
        news.length,
    ]);

    //Avoid multiple requests for
    useEffect(() => {
        if (requestCounter > 20) {
            setApiKey("");
            console.log("Multiple Request Happened!");
        }
    }, [requestCounter, setApiKey]);
    // End of In develop purpose

    return (
        <>
            <Content>
                {apiKey && !error ? (
                    <NewsFeed
                        loading={loading}
                        newsSet={news}
                        favoriteNews={favoriteNews}
                        setFavoriteNews={setFavoriteNews}
                        keywords={[keyword]}
                        startNews={startNews}
                        setNeedMoreNews={setNeedMoreNews}
                        needScroll={needScroll}
                        setNeedScroll={setNeedScroll}
                        message={
                            news.length === 0 ? (
                                <NothingWasFoundMessage />
                            ) : null
                        }
                        createdFor="news"
                    />
                ) : (
                    <Message
                        type={"message-info"}
                        title={"You need API key for getting news."}
                    >
                        <NoApiKeyTextMessage />
                        <InputComponent
                            type="text"
                            placeholder={"Please, input your API key"}
                            value={apiKey}
                            setValue={setApiKey}
                            icon={fingerPrintIcon}
                        />
                    </Message>
                )}
            </Content>
            <ControlBar
                content={
                    (apiKey || error) && (
                        <NewsControls
                            news={news}
                            error={error}
                            selectedCountries={selectedCountries}
                            setSelectedCountries={setSelectedCountries}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            selectedLanguages={selectedLanguages}
                            setSelectedLanguages={setSelectedLanguages}
                            keyword={keyword}
                            setKeyword={setKeyword}
                            loading={loading}
                            countriesAvailableForFilterNews={[
                                "all",
                                ...Object.keys(WORLD_COUNTRIES_CODE_NAME_DATA),
                            ]}
                            minCountriesAvailableForFilterNews={
                                minParametersLength
                            }
                            maxCountriesAvailableForFilterNews={
                                maxParametersLength
                            }
                            categoriesAvailableForFilterNews={
                                DEFAULT_CATEGORIES_NAMES
                            }
                            minCategoriesAvailableForFilterNews={
                                minParametersLength
                            }
                            maxCategoriesAvailableForFilterNews={
                                maxParametersLength
                            }
                            languagesAvailableForFilterNews={Object.keys(
                                DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS
                            )}
                            minLanguagesAvailableForFilterNews={
                                minParametersLength
                            }
                            maxLanguagesAvailableForFilterNews={
                                maxParametersLength
                            }
                            createdFor="news"
                        />
                    )
                }
            />
        </>
    );
};

import "./styles.css";

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";

import {
    DEFAULT_CATEGORIES_NAMES,
    DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS,
    HIGHLIGHTERS,
    COUNTRIES_DATA,
} from "@constants";

import { Message, TabsControls, TabPanel } from "@common";
import { createErrorMessage } from "./utils";
import { FindNewsTab } from "./FindNewsTab";
import { EditNewsTab } from "./EditNewsTab";

export const NewsControls = ({
    news,
    error,
    loading,
    selectedCountries,
    setSelectedCountries,
    selectedCategories,
    setSelectedCategories,
    selectedLanguages,
    setSelectedLanguages,
    keyword,
    setKeyword,
    countriesAvailableForFilterNews,
    minCountriesAvailableForFilterNews,
    maxCountriesAvailableForFilterNews,
    categoriesAvailableForFilterNews,
    minCategoriesAvailableForFilterNews,
    maxCategoriesAvailableForFilterNews,
    languagesAvailableForFilterNews,
    minLanguagesAvailableForFilterNews,
    maxLanguagesAvailableForFilterNews,
    activeTool,
    setActiveTool,
    textOfNoteCard,
    setTextOfNoteCard,
    setOpenNoteId,
    createdFor,
}) => {
    const errorMessage = error && createErrorMessage(news, error);

    const [currentTab, setCurrentTab] = useState(0);

    const changeTab = (_event, newTab) => {
        setCurrentTab(newTab);
        setActiveTool(null);
        setKeyword("");
    };

    return (
        <section className="news-controls">
            {error ? (
                <Message type={errorMessage.type} title={errorMessage.title}>
                    <p>{errorMessage.text}</p>
                </Message>
            ) : (
                !loading && (
                    <>
                        {createdFor === "favorite news" && (
                            <TabsControls
                                tabs={["Find news", "Edit news"]}
                                currentTab={currentTab}
                                changeTab={changeTab}
                            />
                        )}

                        <TabPanel value={currentTab} index={0}>
                            <FindNewsTab
                                loading={loading}
                                selectedCountries={selectedCountries}
                                setSelectedCountries={setSelectedCountries}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                selectedLanguages={selectedLanguages}
                                setSelectedLanguages={setSelectedLanguages}
                                keyword={keyword}
                                setKeyword={setKeyword}
                                countriesAvailableForFilterNews={
                                    countriesAvailableForFilterNews
                                }
                                minCountriesAvailableForFilterNews={
                                    minCountriesAvailableForFilterNews
                                }
                                maxCountriesAvailableForFilterNews={
                                    maxCountriesAvailableForFilterNews
                                }
                                categoriesAvailableForFilterNews={
                                    categoriesAvailableForFilterNews
                                }
                                minCategoriesAvailableForFilterNews={
                                    minCategoriesAvailableForFilterNews
                                }
                                maxCategoriesAvailableForFilterNews={
                                    maxCategoriesAvailableForFilterNews
                                }
                                languagesAvailableForFilterNews={
                                    languagesAvailableForFilterNews
                                }
                                minLanguagesAvailableForFilterNews={
                                    minLanguagesAvailableForFilterNews
                                }
                                maxLanguagesAvailableForFilterNews={
                                    maxLanguagesAvailableForFilterNews
                                }
                                createdFor={createdFor}
                            />
                        </TabPanel>
                        {createdFor === "favorite news" && (
                            <TabPanel value={currentTab} index={1}>
                                <EditNewsTab
                                    activeTool={activeTool}
                                    setActiveTool={setActiveTool}
                                    textOfNoteCard={textOfNoteCard}
                                    setTextOfNoteCard={setTextOfNoteCard}
                                    setOpenNoteId={setOpenNoteId}
                                />
                            </TabPanel>
                        )}
                    </>
                )
            )}
        </section>
    );
};

NewsControls.propTypes = {
    news: PropTypes.arrayOf(
        PropTypes.exact({
            category: PropTypes.arrayOf(
                PropTypes.oneOf(DEFAULT_CATEGORIES_NAMES)
            ).isRequired,
            content: PropTypes.string,
            country: PropTypes.arrayOf(
                PropTypes.oneOf(
                    Object.values(COUNTRIES_DATA).map((countryData) => {
                        // Some specific cases from API
                        switch (countryData.name) {
                            case "Nepal":
                            case "Oman":
                            case "Croatia":
                            case "DR Congo":
                            case "Guatemala":
                            case "Luxembourg":
                            case "Panama":
                            case "Sri Lanka":
                            case "Vietnam":
                            case "Libya":
                            case "Uruguay":
                                return countryData.name;
                            case "Burkina Faso":
                                return "burkina fasco";
                            case "Costa Rica":
                                return "costa Rica";
                            case "Côte d'Ivoire":
                                return "côte d'Ivoire";
                            default:
                                return countryData.name.toLowerCase();
                        }
                    })
                )
            ).isRequired,
            creator: PropTypes.arrayOf(PropTypes.string),
            description: PropTypes.string,
            highlights: PropTypes.exact({
                content: PropTypes.arrayOf(
                    PropTypes.exact({
                        endIndex: PropTypes.number.isRequired,
                        highlighter: PropTypes.oneOf(
                            HIGHLIGHTERS.map((highlighter) => highlighter.name)
                        ).isRequired,
                        id: PropTypes.string.isRequired,
                        startIndex: PropTypes.number.isRequired,
                    })
                ),
                description: PropTypes.arrayOf(
                    PropTypes.exact({
                        endIndex: PropTypes.number.isRequired,
                        highlighter: PropTypes.oneOf(
                            HIGHLIGHTERS.map((highlighter) => highlighter.name)
                        ).isRequired,
                        id: PropTypes.string.isRequired,
                        startIndex: PropTypes.number.isRequired,
                    })
                ),
                title: PropTypes.arrayOf(
                    PropTypes.exact({
                        endIndex: PropTypes.number.isRequired,
                        highlighter: PropTypes.oneOf(
                            HIGHLIGHTERS.map((highlighter) => highlighter.name)
                        ).isRequired,
                        id: PropTypes.string.isRequired,
                        startIndex: PropTypes.number.isRequired,
                    })
                ),
            }),
            image_url: PropTypes.string,
            keywords: PropTypes.arrayOf(PropTypes.string),
            language: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            notes: PropTypes.exact({
                content: PropTypes.arrayOf(
                    PropTypes.exact({
                        noteId: PropTypes.string.isRequired,
                        noteIndex: PropTypes.number.isRequired,
                        noteText: PropTypes.string.isRequired,
                    })
                ),
                description: PropTypes.arrayOf(
                    PropTypes.exact({
                        noteId: PropTypes.string.isRequired,
                        noteIndex: PropTypes.number.isRequired,
                        noteText: PropTypes.string.isRequired,
                    })
                ),
                title: PropTypes.arrayOf(
                    PropTypes.exact({
                        noteId: PropTypes.string.isRequired,
                        noteIndex: PropTypes.number.isRequired,
                        noteText: PropTypes.string.isRequired,
                    })
                ),
            }),
            pubDate: PropTypes.string.isRequired,
            source_id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            video_url: PropTypes.string,
        }).isRequired
    ).isRequired,

    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    selectedCountries: PropTypes.arrayOf(
        PropTypes.oneOf([...Object.keys(COUNTRIES_DATA)])
    ).isRequired,
    setSelectedCountries: PropTypes.func.isRequired,
    selectedCategories: PropTypes.arrayOf(
        PropTypes.oneOf(DEFAULT_CATEGORIES_NAMES)
    ).isRequired,
    setSelectedCategories: PropTypes.func.isRequired,
    selectedLanguages: PropTypes.arrayOf(
        PropTypes.oneOf(
            Object.keys(DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS)
        )
    ).isRequired,
    setSelectedLanguages: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
    setKeyword: PropTypes.func.isRequired,
    countriesAvailableForFilterNews: PropTypes.arrayOf(
        PropTypes.oneOf([...Object.keys(COUNTRIES_DATA)])
    ).isRequired,
    minCountriesAvailableForFilterNews: function (
        props,
        propName,
        componentName
    ) {
        if (props[propName] !== 1) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    maxCountriesAvailableForFilterNews: function (
        props,
        propName,
        componentName
    ) {
        if (props[propName] < 1 || props[propName] > 5) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    categoriesAvailableForFilterNews: PropTypes.arrayOf(
        PropTypes.oneOf(DEFAULT_CATEGORIES_NAMES)
    ).isRequired,
    minCategoriesAvailableForFilterNews: function (
        props,
        propName,
        componentName
    ) {
        if (props[propName] !== 1) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    maxCategoriesAvailableForFilterNews: function (
        props,
        propName,
        componentName
    ) {
        if (props[propName] < 1 || props[propName] > 5) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    languagesAvailableForFilterNews: PropTypes.arrayOf(
        PropTypes.oneOf(
            Object.keys(DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS)
        )
    ).isRequired,
    minLanguagesAvailableForFilterNews: function (
        props,
        propName,
        componentName
    ) {
        if (props[propName] !== 1) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    maxLanguagesAvailableForFilterNews: function (
        props,
        propName,
        componentName
    ) {
        if (props[propName] < 1 || props[propName] > 5) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    activeTool: PropTypes.oneOf([
        ...HIGHLIGHTERS.map((highlighter) => highlighter.name),
        "note-creator",
    ]),
    setActiveTool: requiredIf(
        PropTypes.func,
        (props) => props.createdFor !== "news"
    ),
    textOfNoteCard: requiredIf(
        PropTypes.string,
        (props) => props.createdFor !== "news"
    ),
    setTextOfNoteCard: requiredIf(
        PropTypes.func,
        (props) => props.createdFor !== "news"
    ),
    setOpenNoteId: requiredIf(
        PropTypes.func,
        (props) => props.createdFor !== "news"
    ),
    createdFor: PropTypes.oneOf(["favorite news", "news"]).isRequired,
};

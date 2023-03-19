import "./styles.css";

import React from "react";
import { useState } from "react";
import { string, bool, func, arrayOf, oneOf } from "prop-types";
import requiredIf from "react-required-if";

import {
    newsType,
    countryCodeType,
    categoryType,
    languageCodeType,
    minFilterItemType,
    maxFilterItemType,
    toolType,
} from "@types";

import { Message, TabsControls, TabPanel } from "@common";
import { createErrorMessage } from "./utils/createErrorMessage";
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
    news: arrayOf(newsType).isRequired,
    error: string,
    loading: bool.isRequired,
    selectedCountries: arrayOf(countryCodeType).isRequired,
    setSelectedCountries: func.isRequired,
    selectedCategories: arrayOf(categoryType).isRequired,
    setSelectedCategories: func.isRequired,
    selectedLanguages: arrayOf(languageCodeType).isRequired,
    setSelectedLanguages: func.isRequired,
    keyword: string.isRequired,
    setKeyword: func.isRequired,
    countriesAvailableForFilterNews: arrayOf(countryCodeType).isRequired,
    minCountriesAvailableForFilterNews: minFilterItemType, // Conditional number
    maxCountriesAvailableForFilterNews: maxFilterItemType, // Conditional number
    categoriesAvailableForFilterNews: arrayOf(categoryType).isRequired,
    minCategoriesAvailableForFilterNews: minFilterItemType, // Conditional number
    maxCategoriesAvailableForFilterNews: maxFilterItemType, // Conditional number
    languagesAvailableForFilterNews: arrayOf(languageCodeType).isRequired,
    minLanguagesAvailableForFilterNews: minFilterItemType, // Conditional number
    maxLanguagesAvailableForFilterNews: maxFilterItemType, // Conditional number
    activeTool: toolType,
    setActiveTool: requiredIf(func, (props) => props.createdFor !== "news"),
    textOfNoteCard: requiredIf(string, (props) => props.createdFor !== "news"),
    setTextOfNoteCard: requiredIf(func, (props) => props.createdFor !== "news"),
    setOpenNoteId: requiredIf(func, (props) => props.createdFor !== "news"),
    createdFor: oneOf(["favorite news", "news"]).isRequired,
};

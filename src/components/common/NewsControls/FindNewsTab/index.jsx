import "./styles.css";

import React from "react";

import {
    searchIcon,
    hintIcon,
    countriesIcon,
    categoriesIcon,
    languagesIcon,
    keywordsIcon,
} from "@assets";

import {
    WORLD_COUNTRY_NAMES,
    WORLD_COUNTRY_FLAGS,
    WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE,
} from "@constants";

import { InputComponent } from "@common/InputComponent/";
import { FilterItem } from "./FilterItem";

export const FindNewsTab = ({ findNewsTabProps }) => {
    const {
        selectedCountries,
        setSelectedCountries,
        selectedCategories,
        setSelectedCategories,
        selectedLanguages,
        setSelectedLanguages,
        keyword,
        setKeyword,
        loading,
        countriesAvailableForFilterNews,
        minCountriesAvailableForFilterNews,
        maxCountriesAvailableForFilterNews,
        categoriesAvailableForFilterNews,
        minCategoriesAvailableForFilterNews,
        maxCategoriesAvailableForFilterNews,
        languagesAvailableForFilterNews,
        minLanguagesAvailableForFilterNews,
        maxLanguagesAvailableForFilterNews,
    } = findNewsTabProps;

    const filterItemsConfig = [
        {
            title: "Selected country:",
            icon: countriesIcon,
            selectedItems: selectedCountries,
            setSelectedItems: setSelectedCountries,
            itemsAvailableForFilterNews: countriesAvailableForFilterNews,
            minItemsAvailableForFilterNews: minCountriesAvailableForFilterNews,
            maxItemsAvailableForFilterNews: maxCountriesAvailableForFilterNews,
            labelOptionForItems: WORLD_COUNTRY_NAMES,
            labelIconOptionsForItems: WORLD_COUNTRY_FLAGS,
            addButtonText: "Add More Countries",
            removeButtonText: "Remove Country",
        },
        {
            title: "Selected category:",
            icon: categoriesIcon,
            selectedItems: selectedCategories,
            setSelectedItems: setSelectedCategories,
            itemsAvailableForFilterNews: Object.keys(
                categoriesAvailableForFilterNews
            ),
            minItemsAvailableForFilterNews: minCategoriesAvailableForFilterNews,
            maxItemsAvailableForFilterNews: maxCategoriesAvailableForFilterNews,
            labelOptionForItems: null,
            labelIconOptionsForItems: categoriesAvailableForFilterNews,
            addButtonText: "Add More Categories",
            removeButtonText: "Remove Category",
        },
        {
            title: "Selected languages:",
            icon: languagesIcon,
            selectedItems: selectedLanguages,
            setSelectedItems: setSelectedLanguages,
            itemsAvailableForFilterNews: Object.keys(
                languagesAvailableForFilterNews
            ),
            minItemsAvailableForFilterNews: minLanguagesAvailableForFilterNews,
            maxItemsAvailableForFilterNews: maxLanguagesAvailableForFilterNews,
            labelOptionForItems: languagesAvailableForFilterNews,
            labelIconOptionsForItems: WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE,
            addButtonText: "Add More Languages",
            removeButtonText: "Remove Language",
        },
    ];

    return (
        <>
            <img
                className="find-news-tab-title-icon"
                src={hintIcon}
                alt="#"
                aria-hidden={true}
            />
            <h3 className="find-news-tab-title">
                Do You want to find something special?
            </h3>

            {filterItemsConfig.map((filterItem, index) => (
                <FilterItem
                    key={index}
                    title={filterItem.title}
                    icon={filterItem.icon}
                    selectedItems={filterItem.selectedItems}
                    setSelectedItems={filterItem.setSelectedItems}
                    itemsAvailableForFilterNews={
                        filterItem.itemsAvailableForFilterNews
                    }
                    minItemsAvailableForFilterNews={
                        filterItem.minItemsAvailableForFilterNews
                    }
                    maxItemsAvailableForFilterNews={
                        filterItem.maxItemsAvailableForFilterNews
                    }
                    labelOptionForItems={filterItem.labelOptionForItems}
                    labelIconOptionsForItems={
                        filterItem.labelIconOptionsForItems
                    }
                    addButtonText={filterItem.addButtonText}
                    removeButtonText={filterItem.removeButtonText}
                    loading={loading}
                />
            ))}

            <>
                <div className="find-news-tab-keyword-input-title-wrapper">
                    <img
                        className="find-news-tab-keyword-input-title-icon"
                        src={keywordsIcon}
                        alt="#"
                        aria-hidden={true}
                    />
                    <h4 className="find-news-tab-keyword-input-title">
                        Keywords or phrases you are interested in:
                    </h4>
                </div>
                <InputComponent
                    type="text"
                    placeholder={"Keyword..."}
                    value={keyword}
                    setValue={setKeyword}
                    icon={searchIcon}
                />
            </>
        </>
    );
};

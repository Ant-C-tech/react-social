import "./styles.css";

import React from "react";
import PropTypes from "prop-types";

import {
    searchIcon,
    hintIcon,
    countriesIcon,
    categoriesIcon,
    languagesIcon,
    keywordsIcon,
} from "@assets";

import { COUNTRIES_DATA, CATEGORIES_DATA, LANGUAGES_DATA } from "@constants";

import { InputComponent } from "@common/InputComponent/";
import { FilterItem } from "./FilterItem";

export const FindNewsTab = ({
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
}) => {
    const filterItemsConfig = [
        {
            title: "Selected country:",
            icon: countriesIcon,
            selectedItems: selectedCountries,
            setSelectedItems: setSelectedCountries,
            itemsAvailableForFilterNews: countriesAvailableForFilterNews,
            minItemsAvailableForFilterNews: minCountriesAvailableForFilterNews,
            maxItemsAvailableForFilterNews: maxCountriesAvailableForFilterNews,
            labelData: COUNTRIES_DATA,
            addButtonText: "Add More Countries",
            removeButtonText: "Remove Country",
        },
        {
            title: "Selected category:",
            icon: categoriesIcon,
            selectedItems: selectedCategories,
            setSelectedItems: setSelectedCategories,
            itemsAvailableForFilterNews: categoriesAvailableForFilterNews,
            minItemsAvailableForFilterNews: minCategoriesAvailableForFilterNews,
            maxItemsAvailableForFilterNews: maxCategoriesAvailableForFilterNews,
            labelData: CATEGORIES_DATA,
            addButtonText: "Add More Categories",
            removeButtonText: "Remove Category",
        },
        {
            title: "Selected languages:",
            icon: languagesIcon,
            selectedItems: selectedLanguages,
            setSelectedItems: setSelectedLanguages,
            itemsAvailableForFilterNews: languagesAvailableForFilterNews,
            minItemsAvailableForFilterNews: minLanguagesAvailableForFilterNews,
            maxItemsAvailableForFilterNews: maxLanguagesAvailableForFilterNews,
            labelData: LANGUAGES_DATA,
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
                    loading={loading}
                    title={filterItem.title}
                    icon={filterItem.icon}
                    selectedItems={filterItem.selectedItems}
                    setSelectedItems={filterItem.setSelectedItems}
                    itemsAvailableForFilterNews={
                        filterItem.itemsAvailableForFilterNews.length !== 0
                            ? filterItem.itemsAvailableForFilterNews
                            : ["all"]
                    }
                    minItemsAvailableForFilterNews={
                        filterItem.minItemsAvailableForFilterNews
                    }
                    maxItemsAvailableForFilterNews={
                        filterItem.maxItemsAvailableForFilterNews
                    }
                    labelData={filterItem.labelData}
                    addButtonText={filterItem.addButtonText}
                    removeButtonText={filterItem.removeButtonText}
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
                    placeholder={"Keyword..."}
                    value={keyword}
                    setValue={setKeyword}
                    iconSrc={searchIcon}
                />
            </>
        </>
    );
};

FindNewsTab.propTypes = {
    loading: PropTypes.bool.isRequired,
    selectedCountries: PropTypes.arrayOf(
        PropTypes.oneOf(Object.keys(COUNTRIES_DATA))
    ).isRequired,
    setSelectedCountries: PropTypes.func.isRequired,
    selectedCategories: PropTypes.arrayOf(
        PropTypes.oneOf(Object.keys(CATEGORIES_DATA))
    ).isRequired,
    setSelectedCategories: PropTypes.func.isRequired,
    selectedLanguages: PropTypes.arrayOf(
        PropTypes.oneOf(Object.keys(LANGUAGES_DATA))
    ).isRequired,
    setSelectedLanguages: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
    setKeyword: PropTypes.func.isRequired,
    countriesAvailableForFilterNews: PropTypes.arrayOf(
        PropTypes.oneOf(Object.keys(COUNTRIES_DATA))
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
        PropTypes.oneOf(Object.keys(CATEGORIES_DATA))
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
        PropTypes.oneOf(Object.keys(LANGUAGES_DATA))
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
};

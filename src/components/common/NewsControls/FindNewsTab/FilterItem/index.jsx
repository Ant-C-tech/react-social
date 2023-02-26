import "./styles.css";
import { addIcon, removeIcon } from "@assets";

import React from "react";
import PropTypes from "prop-types";

import {
    WORLD_COUNTRIES_CODE_NAME_DATA,
    DEFAULT_CATEGORIES_NAMES,
    DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS,
} from "@constants";

import {
    addSelectWithNotSelectedValue,
    getNotSelectedItems,
    removeLastSelect,
    updateSelectedItems,
} from "./utils";

import { SelectComponent, Button } from "@common";

export const FilterItem = ({
    loading,
    title,
    icon,
    selectedItems,
    setSelectedItems,
    itemsAvailableForFilterNews,
    minItemsAvailableForFilterNews,
    maxItemsAvailableForFilterNews,
    labelOptionForItems,
    labelIconOptionsForItems,
    addButtonText,
    removeButtonText,
}) => {
    // console.log("labelOptionForItems", labelOptionForItems);
    // console.log("labelIconOptionsForItems", labelIconOptionsForItems);
    return (
        <div className="filter-item">
            <div className="filter-item-title-wrapper">
                <img
                    className="filter-item-title-icon"
                    src={icon}
                    alt="#"
                    aria-hidden={true}
                />
                <h4 className="filter-item-title">{title}</h4>
            </div>

            {selectedItems.map((item, index) => {
                const availableItems = getNotSelectedItems(
                    item,
                    itemsAvailableForFilterNews,
                    selectedItems
                );

                return (
                    <SelectComponent
                        key={index}
                        valueOptions={availableItems}
                        labelOptions={labelOptionForItems}
                        labelIconOptions={labelIconOptionsForItems}
                        defaultValue={item}
                        onChange={({ value }) => {
                            if (!loading) {
                                updateSelectedItems(
                                    index,
                                    value,
                                    selectedItems,
                                    setSelectedItems
                                );
                            }
                        }}
                        isSearchable={true}
                    />
                );
            })}
            <div className="filter-item-controls">
                {selectedItems.length !== maxItemsAvailableForFilterNews &&
                    selectedItems[0] !== "all" && (
                        <Button
                            text={addButtonText}
                            onClick={() => {
                                if (!loading) {
                                    addSelectWithNotSelectedValue(
                                        selectedItems,
                                        itemsAvailableForFilterNews,
                                        setSelectedItems
                                    );
                                }
                            }}
                            buttonImageIcon={addIcon}
                        />
                    )}
                {selectedItems.length !== minItemsAvailableForFilterNews && (
                    <Button
                        text={removeButtonText}
                        onClick={() => {
                            if (!loading) {
                                removeLastSelect(
                                    selectedItems,
                                    setSelectedItems
                                );
                            }
                        }}
                        buttonImageIcon={removeIcon}
                    />
                )}
            </div>
        </div>
    );
};

FilterItem.propTypes = {
    loading: PropTypes.bool.isRequired,
    title: PropTypes.oneOf([
        "Selected country:",
        "Selected category:",
        "Selected languages:",
    ]),
    icon: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(
        PropTypes.oneOf([
            ...Object.keys(WORLD_COUNTRIES_CODE_NAME_DATA),
            ...DEFAULT_CATEGORIES_NAMES,
            ...Object.keys(DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS),
        ])
    ).isRequired,
    setSelectedItems: PropTypes.func.isRequired,
    itemsAvailableForFilterNews: PropTypes.arrayOf(
        PropTypes.oneOf([
            ...Object.keys(WORLD_COUNTRIES_CODE_NAME_DATA),
            ...DEFAULT_CATEGORIES_NAMES,
            ...Object.keys(DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS),
        ])
    ).isRequired,
    minItemsAvailableForFilterNews: function (props, propName, componentName) {
        if (props[propName] !== 1) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },
    maxItemsAvailableForFilterNews: function (props, propName, componentName) {
        if (props[propName] < 1 || props[propName] > 5) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
            );
        }
    },

    labelOptionForItems: PropTypes.object, // null for category
    labelIconOptionsForItems: PropTypes.object.isRequired,
    addButtonText: PropTypes.string.isRequired,
    removeButtonText: PropTypes.string.isRequired,
};

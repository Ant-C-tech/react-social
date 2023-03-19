import "./styles.css";
import { addIcon, removeIcon } from "@assets";

import React from "react";
import PropTypes from "prop-types";

import { COUNTRIES_DATA, CATEGORIES_DATA, LANGUAGES_DATA } from "@constants";

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
    labelData,
    addButtonText,
    removeButtonText,
}) => {
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
                        labelData={labelData}
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
                    />
                );
            })}
            <div className="filter-item-controls">
                {selectedItems.length !== maxItemsAvailableForFilterNews &&
                    selectedItems[0] !== "all" && (
                        <Button
                            text={addButtonText}
                            buttonIconSrc={addIcon}
                            active={false}
                            onClick={() => {
                                if (!loading) {
                                    addSelectWithNotSelectedValue(
                                        selectedItems,
                                        itemsAvailableForFilterNews,
                                        setSelectedItems
                                    );
                                }
                            }}
                        />
                    )}
                {selectedItems.length !== minItemsAvailableForFilterNews && (
                    <Button
                        text={removeButtonText}
                        buttonIconSrc={removeIcon}
                        active={false}
                        onClick={() => {
                            if (!loading) {
                                removeLastSelect(
                                    selectedItems,
                                    setSelectedItems
                                );
                            }
                        }}
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
            ...Object.keys(COUNTRIES_DATA),
            ...Object.keys(CATEGORIES_DATA),
            ...Object.keys(LANGUAGES_DATA),
        ])
    ).isRequired,
    setSelectedItems: PropTypes.func.isRequired,
    itemsAvailableForFilterNews: PropTypes.arrayOf(
        PropTypes.oneOf([
            ...Object.keys(COUNTRIES_DATA),
            ...Object.keys(CATEGORIES_DATA),
            ...Object.keys(LANGUAGES_DATA),
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
    labelData: PropTypes.oneOf([
        COUNTRIES_DATA,
        CATEGORIES_DATA,
        LANGUAGES_DATA,
    ]).isRequired,
    addButtonText: PropTypes.string.isRequired,
    removeButtonText: PropTypes.string.isRequired,
};

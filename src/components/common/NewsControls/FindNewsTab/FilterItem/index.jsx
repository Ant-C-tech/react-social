import "./styles.css";
import { addIcon, removeIcon } from "@assets";

import React from "react";
import { string, bool, func, arrayOf, oneOf } from "prop-types";

import {
    minFilterItemType,
    maxFilterItemType,
    selectOptionType,
    selectLabelType,
} from "@types";

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
    loading: bool.isRequired,
    title: oneOf([
        "Selected country:",
        "Selected category:",
        "Selected languages:",
    ]),
    icon: string.isRequired,
    selectedItems: arrayOf(selectOptionType).isRequired,
    setSelectedItems: func.isRequired,
    itemsAvailableForFilterNews: arrayOf(selectOptionType).isRequired,
    minItemsAvailableForFilterNews: minFilterItemType,
    maxItemsAvailableForFilterNews: maxFilterItemType,
    labelData: selectLabelType.isRequired,
    addButtonText: string.isRequired,
    removeButtonText: string.isRequired,
};

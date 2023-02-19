import "./styles.css";
import { addIcon, removeIcon } from "@assets";

import React from "react";
import PropTypes from "prop-types";

import { SelectComponent, Button } from "@common";

import {
    addSelectWithNotSelectedValue,
    getNotSelectedItems,
    removeLastSelect,
    updateSelectedItems,
} from "./utils";

export const FilterItem = ({
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
    loading,
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
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    selectedItems: PropTypes.array.isRequired,
    setSelectedItems: PropTypes.func.isRequired,
    itemsAvailableForFilterNews: PropTypes.array.isRequired,
    minItemsAvailableForFilterNews: PropTypes.number.isRequired,
    maxItemsAvailableForFilterNews: PropTypes.number.isRequired,
    labelOptionForItems: PropTypes.object, // null for category
    labelIconOptionsForItems: PropTypes.object.isRequired,
    addButtonText: PropTypes.string.isRequired,
    removeButtonText: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
};

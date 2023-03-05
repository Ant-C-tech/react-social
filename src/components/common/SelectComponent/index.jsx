import "./styles.css";

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { selectStyles } from "./selectStyles";
import { selectTheme } from "./selectTheme";

import { COUNTRIES_DATA, CATEGORIES_DATA, LANGUAGES_DATA } from "@constants";

export const SelectComponent = ({
    valueOptions,
    labelData,
    defaultValue,
    onChange,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const getIcon = (currentOption) => {
        return labelData[currentOption].icon;
    };

    const options = valueOptions.map((currentOption) => {
        return {
            value: currentOption,
            label: (
                <span className="select-option-item">
                    <span>{getIcon(currentOption)} </span>
                    <span className="select-option-item-text">
                        {labelData[currentOption].name}
                    </span>
                </span>
            ),
            filterData: labelData[currentOption].name,
        };
    });

    const customFilter = (option, searchText) => {
        if (
            option.data.filterData
                .toLowerCase()
                .startsWith(searchText.toLowerCase())
        ) {
            return true;
        } else {
            return false;
        }
    };

    const getValue = (value) => {
        return {
            value: value,
            label: (
                <span className="select-value">
                    {getIcon(value)}{" "}
                    <span className="select-value-text">
                        {labelData[value].name}
                    </span>
                </span>
            ),
        };
    };

    return (
        <Select
            options={options}
            styles={selectStyles}
            value={getValue(defaultValue)}
            isSearchable={true}
            hideSelectedOptions={true}
            filterOption={customFilter}
            theme={(theme) => selectTheme(theme)}
            className={`select ${isFocused ? "select-with-focus" : ""}`}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
};

SelectComponent.propTypes = {
    valueOptions: PropTypes.arrayOf(
        PropTypes.oneOf([
            ...Object.keys(COUNTRIES_DATA),
            ...Object.keys(CATEGORIES_DATA),
            ...Object.keys(LANGUAGES_DATA),
        ])
    ).isRequired,
    labelData: PropTypes.oneOf([
        COUNTRIES_DATA,
        CATEGORIES_DATA,
        LANGUAGES_DATA,
    ]).isRequired,
    defaultValue: PropTypes.oneOf([
        ...Object.keys(COUNTRIES_DATA),
        ...Object.keys(CATEGORIES_DATA),
        ...Object.keys(LANGUAGES_DATA),
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
};

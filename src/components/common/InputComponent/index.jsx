import "./styles.css";

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import { DebounceInput } from "react-debounce-input";
import { removeIcon } from "@assets";

export const InputComponent = ({ placeholder, value, setValue, iconSrc }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`input-component ${isFocused ? "withFocus" : ""}`}>
            <img
                className="input-icon"
                src={iconSrc}
                alt="#"
                aria-hidden={true}
            />
            <DebounceInput
                type="text"
                minLength={2}
                debounceTimeout={1000}
                placeholder={placeholder}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                className="debounce-input"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {value.length > 0 && (
                <button
                    className="input-component-clear-button"
                    onClick={() => {
                        setValue("");
                    }}
                >
                    <img
                        className="input-component-clear-button-icon"
                        src={removeIcon}
                        alt="#"
                        aria-hidden={true}
                    />
                </button>
            )}
        </div>
    );
};

InputComponent.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    iconSrc: PropTypes.string.isRequired,
};

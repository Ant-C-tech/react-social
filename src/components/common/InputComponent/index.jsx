import "./styles.css";

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import { DebounceInput } from "react-debounce-input";
import { BackspaceTwoTone } from "@material-ui/icons";

export const InputComponent = ({
    type,
    placeholder,
    value,
    setValue,
    icon,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`input-component ${isFocused ? "withFocus" : ""}`}>
            <img className="input-icon" src={icon} alt="#" aria-hidden={true} />
            <DebounceInput
                type={type}
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
                    <BackspaceTwoTone className="input-component-clear-button-icon" />
                </button>
            )}
        </div>
    );
};

InputComponent.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
};

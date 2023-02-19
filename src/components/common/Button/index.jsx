import "./styles.css";

import React from "react";
import PropTypes from "prop-types";

export const Button = ({
    text,
    active,
    onClick,
    buttonImageIcon,
    buttonComponentIcon,
    tooltipText,
}) => {
    const Icon = buttonComponentIcon;

    return (
        <button
            className={`button
		${!text ? "button-without-text" : ""}
		${active ? "button-active" : ""}`}
            onClick={onClick}
            title={tooltipText}
        >
            {buttonComponentIcon && <Icon className="button-component-icon" />}
            {buttonImageIcon && (
                <img
                    className="button-image-icon"
                    src={buttonImageIcon}
                    alt="#"
                    aria-hidden={true}
                />
            )}
            {text && <span className="button-text">{text}</span>}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    buttonImageIcon: PropTypes.string,
    buttonComponentIcon: PropTypes.elementType,
    tooltipText: PropTypes.string,
};

import "./styles.css";

import React from "react";
import PropTypes from "prop-types";

export const Button = ({ text, buttonIconSrc, active, onClick }) => {
    return (
        <button
            className={`button
		${active ? "button-active" : ""}`}
            onClick={onClick}
        >
            <img
                className="button-image-icon"
                src={buttonIconSrc}
                alt="#"
                aria-hidden={true}
            />
            <span className="button-text">{text}</span>
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    buttonIconSrc: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

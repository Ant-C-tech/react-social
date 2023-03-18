import "./styles.css";

import React from "react";
import PropTypes from "prop-types";

export const ButtonSmall = ({ iconSrc, onClick }) => (
    <button className="button-small" onClick={onClick}>
        <img
            className="button-small-icon"
            src={iconSrc}
            alt="#"
            aria-hidden={true}
        />
    </button>
);

ButtonSmall.propTypes = {
    iconSrc: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

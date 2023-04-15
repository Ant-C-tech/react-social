import "./styles.css";

import React from "react";
import PropTypes from "prop-types";

export const ButtonSmall = ({ iconSrc, title, form, active, onClick }) => (
    <button
        className={`button-small ${
            active ? "button-small-active" : ""
        } button-small-${form}`}
        title={title}
        onClick={onClick}
    >
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
    title: PropTypes.string.isRequired,
    form: PropTypes.oneOf(["round", "square"]).isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

import "./styles.css";
import { hintIcon, warningIcon, errorIcon } from "@assets";

import React from "react";
import PropTypes from "prop-types";

export const Message = ({ type, title, children }) => {
    const getIcon = (typeOfMessage) => {
        switch (typeOfMessage) {
            case "message-warning":
                return warningIcon;
            case "message-error":
                return errorIcon;
            default:
                return hintIcon;
        }
    };

    return (
        <article className={`${type} message`}>
            <h2 className="message-title">{title}</h2>
            <img
                src={getIcon(type)}
                className="message-icon"
                alt="#"
                aria-hidden={true}
            />
            <div className="message-text">{children}</div>
        </article>
    );
};

Message.propTypes = {
    type: PropTypes.oneOf(["message-info", "message-warning", "message-error"])
        .isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

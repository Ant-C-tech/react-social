import "./styles.css";

import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

export const IconButtonComponent = ({ children, onClick }) => (
    <IconButton
        className="iconButtonComponent"
        component="span"
        onClick={onClick}
    >
        {children}
    </IconButton>
);

IconButtonComponent.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
};

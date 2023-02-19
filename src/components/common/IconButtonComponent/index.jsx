import "./styles.css";

import React from "react";
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

import React from "react";
import { number, element } from "prop-types";

export const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <>{children}</>}
        </div>
    );
};

TabPanel.propTypes = {
    children: element.isRequired,
    value: number.isRequired,
    index: number.isRequired,
};

import "./style.css";

import React from "react";

export const Content = ({ children }) => {
    return (
        <>
            <section className="content-container">{children}</section>
        </>
    );
};

import "./styles.css";

import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import PropTypes from "prop-types";

export const CustomLink = ({ type, content, href, hover }) => {
    let resolved = useResolvedPath(href);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            className={`custom-link ${hover} ${match ? "active" : ""}`}
            to={href}
            target={type === "external" ? "_blank" : "_self"}
        >
            {content}
        </Link>
    );
};

CustomLink.propTypes = {
    type: PropTypes.oneOf(["internal", "external"]).isRequired,
    content: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    hover: PropTypes.oneOf(["underline", "left-line"]).isRequired,
    target: PropTypes.string,
};

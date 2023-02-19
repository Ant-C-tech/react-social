import "./styles.css";

import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import PropTypes from "prop-types";

export const CustomLink = ({ type, content, href, modification }) => {
    let resolved = useResolvedPath(href);
    let match = useMatch({ path: resolved.pathname, end: true });

    return type === "external" ? (
        <a
            className={`custom-link ${modification}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {content}
        </a>
    ) : (
        <Link
            className={`custom-link ${modification} ${match ? "active" : ""}`}
            to={href}
        >
            {content}
        </Link>
    );
};

CustomLink.propTypes = {
    type: PropTypes.oneOf(["internal", "external"]).isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    href: PropTypes.string.isRequired,
    modification: PropTypes.string,
    target: PropTypes.string,
};

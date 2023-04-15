import "./styles.css";

import React from "react";
import { string, func } from "prop-types";

export const NoteCardControl = ({ text, onClick }) => {
    return (
        <button className="note-card-control" onClick={onClick}>
            {text}
        </button>
    );
};

NoteCardControl.propTypes = {
    text: string.isRequired,
    onClick: func.isRequired,
};

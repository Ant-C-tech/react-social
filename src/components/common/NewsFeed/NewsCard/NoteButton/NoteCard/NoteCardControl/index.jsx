import "./styles.css";

import React from "react";

export const NoteCardControl = ({ text, onClick }) => {
    return (
        <button className="note-card-control" onClick={onClick}>
            {text}
        </button>
    );
};

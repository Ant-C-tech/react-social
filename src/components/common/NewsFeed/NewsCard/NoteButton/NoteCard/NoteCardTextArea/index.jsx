import "./styles.css";

import React from "react";
import { string, func } from "prop-types";
import { useEffect } from "react";
import { TextArea } from "@common";

export const NoteCardTextArea = ({ text, setText }) => {
    useEffect(() => {
        const noteCard = document.querySelector(".text-area-field");
        noteCard.focus();
    }, []);

    return (
        <span className="note-card-textarea">
            <TextArea text={text} setText={setText} rows={4} />
        </span>
    );
};

NoteCardTextArea.propTypes = {
    text: string.isRequired,
    setText: func.isRequired,
};

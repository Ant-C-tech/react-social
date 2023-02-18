import "./styles.css";

import { useState } from "react";

import { NoteCardControl } from "./NoteCardControl";
import { NoteCardTextArea } from "./NoteCardTextArea";

import { editNote, deleteNote } from "./utils";

export const NoteCard = ({
    noteText,
    noteCardLeft,
    favoriteNews,
    setFavoriteNews,
    id,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedNoteText, setUpdatedNoteText] = useState(noteText);

    return (
        <span
            className="note-card"
            tabIndex={0}
            style={{
                left: noteCardLeft,
                overflowY: editMode ? "hidden" : "auto",
            }}
        >
            {editMode ? (
                <NoteCardTextArea
                    text={updatedNoteText}
                    setText={setUpdatedNoteText}
                />
            ) : (
                <span className="note-card-text">{noteText}</span>
            )}
            <span className="note-card-controls">
                {editMode ? (
                    <NoteCardControl
                        text="Save Note"
                        onClick={() => {
                            setEditMode(false);
                            editNote(
                                favoriteNews,
                                setFavoriteNews,
                                id,
                                updatedNoteText
                            );
                        }}
                    />
                ) : (
                    <>
                        <NoteCardControl
                            text="Edit Note"
                            onClick={() => setEditMode(true)}
                        />
                        <NoteCardControl
                            text="Delete Note"
                            onClick={() =>
                                deleteNote(favoriteNews, setFavoriteNews, id)
                            }
                        />
                    </>
                )}
            </span>
        </span>
    );
};

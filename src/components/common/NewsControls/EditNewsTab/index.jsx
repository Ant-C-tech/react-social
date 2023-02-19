import "./styles.css";
import { makeNoteIcon, stickyNoteIcon, highlightToolsIcon } from "@assets";

import React from "react";
import PropTypes from "prop-types";

import { Button } from "@common/";
import { NoteTextArea } from "./NoteTextArea";

import { HIGHLIGHTERS } from "./constants";

export const EditNewsTab = ({ editNewsTabProps }) => {
    const {
        activeTool,
        setActiveTool,
        textOfNoteCard,
        setTextOfNoteCard,
        setOpenNoteId,
    } = editNewsTabProps;
    return (
        <>
            <img
                className="edit-news-tab-title-icon"
                src={highlightToolsIcon}
                alt="#"
                aria-hidden={true}
            />
            <h4 className="edit-news-tab-title">
                Do You want to highlight some text or remove some existing
                highlight?
            </h4>

            <div className="edit-news-tab-control-toolbar">
                {HIGHLIGHTERS.map((highlighter, index) => {
                    const { name, icon, tooltipText } = highlighter;
                    return (
                        <Button
                            key={index}
                            active={name === activeTool}
                            onClick={() => {
                                setActiveTool(name === activeTool ? "" : name);
                                setOpenNoteId("");
                            }}
                            buttonImageIcon={icon}
                            tooltipText={tooltipText}
                        />
                    );
                })}
            </div>

            <img
                className="edit-news-tab-title-icon"
                src={makeNoteIcon}
                alt="#"
                aria-hidden={true}
            />
            <h4 className="edit-news-tab-title">
                Do you want to create some note?
            </h4>
            <div className="edit-news-tab-control">
                <Button
                    text="Create Note"
                    active={"note-creator" === activeTool}
                    onClick={() => {
                        setActiveTool(
                            "note-creator" === activeTool ? "" : "note-creator"
                        );
                        setOpenNoteId("");
                    }}
                    buttonImageIcon={stickyNoteIcon}
                />
            </div>
            {"note-creator" === activeTool && (
                <div className="edit-news-tab-control">
                    <NoteTextArea
                        text={textOfNoteCard}
                        setText={setTextOfNoteCard}
                    />
                </div>
            )}
        </>
    );
};

EditNewsTab.propTypes = {
    editNewsTabProps: PropTypes.shape({
        activeTool: PropTypes.string, //undefine on the news page
        setActiveTool: PropTypes.func, //undefine on the news page
        textOfNoteCard: PropTypes.string, //undefine on the news page
        setTextOfNoteCard: PropTypes.func, //undefine on the news page
        setOpenNoteId: PropTypes.func, //undefine on the news page
    }),
};

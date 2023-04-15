import "./styles.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
    playVideoIcon,
    newsIcon,
    originalSourceIcon,
    addToFavoriteButtonIcon,
    removeIcon,
    readMoreButtonIcon,
    hideFullTextButtonIcon,
} from "@assets";

import React from "react";
import { string, bool, func, arrayOf, oneOf } from "prop-types";
import { useState, useRef } from "react";
import Highlighter from "react-highlight-words";
import { LazyLoadImage } from "react-lazy-load-image-component";
import requiredIf from "react-required-if";

import { CustomLink } from "@common/CustomLink/";
import { Button } from "@common/Button/";

import { getEditedHtmlStructure } from "./utils";

import { newsType, toolType } from "@types";

export const NewsCard = ({
    createdFor,
    news,
    keyword,
    activeTool,
    isFavorite,
    openNoteId,
    setOpenNoteId,
    setActiveTool,
    addToFavorite,
    removeFromFavorite,
    addHighlight,
    addNote,
    favoriteNews,
    setFavoriteNews,
}) => {
    const newsCardRef = useRef();

    const [isContentShown, setIsContentShown] = useState(false);

    const {
        title,
        link,
        creator,
        video_url,
        description,
        content,
        pubDate,
        image_url,
        source_id,
        country,
        category,
        language,
        highlights,
        notes,
    } = news;

    return (
        <article
            className="news-card"
            ref={newsCardRef}
            onClick={(event) => {
                if (
                    createdFor === "favorite news" &&
                    !event.target.classList.contains("note-card") &&
                    !event.target.classList.contains("note-card-text") &&
                    !event.target.classList.contains("text-area-field") &&
                    !event.target.classList.contains("note-button-icon") &&
                    !event.target.classList.contains("note-button") &&
                    !event.target.classList.contains("note-card-control")
                ) {
                    setOpenNoteId("");
                }
            }}
        >
            <header className="news-card-header">
                {category && (
                    <div className="news-card-category">
                        {category.map((currentCategory, index) => (
                            <h3 key={index}>{currentCategory}</h3>
                        ))}
                    </div>
                )}
                {country && (
                    <div className="news-card-country">
                        {country.map((currentCountry, index) => (
                            <h3 key={index}>{currentCountry}</h3>
                        ))}
                    </div>
                )}
            </header>

            <div className={`news-card-content ${language}`}>
                <div className="news-card-content-title">
                    <img
                        className="news-card-icon news-card-title-icon"
                        src={newsIcon}
                        alt="#"
                        aria-hidden={true}
                    />
                    <h2
                        className={`news-card-content-title-text cursor-${activeTool}`}
                        onMouseUp={() => {
                            activeTool !== "note-creator"
                                ? addHighlight(link, "title")
                                : addNote(link, "title");
                        }}
                    >
                        {createdFor === "news" ? (
                            <Highlighter
                                highlightClassName="news-card-highlight"
                                searchWords={[keyword]}
                                autoEscape={true}
                                textToHighlight={title || ""}
                            />
                        ) : title ? (
                            getEditedHtmlStructure(
                                title,
                                highlights && highlights["title"],
                                notes && notes["title"],
                                [keyword],
                                openNoteId,
                                setOpenNoteId,
                                setActiveTool,
                                newsCardRef,
                                favoriteNews,
                                setFavoriteNews
                            )
                        ) : null}
                    </h2>
                </div>

                {image_url && (
                    <LazyLoadImage
                        className="news-card-image"
                        wrapperClassName="news-card-image-wrapper"
                        effect="blur"
                        src={image_url}
                        alt={title}
                    />
                )}

                {video_url && (
                    <CustomLink
                        type="external"
                        content={
                            <>
                                <img
                                    src={playVideoIcon}
                                    alt="#"
                                    aria-hidden={true}
                                />
                                <span className="news-card-link-add-text">
                                    Watch Now
                                </span>
                            </>
                        }
                        href={video_url}
                        hover="left-line"
                        active=""
                    />
                )}

                <p
                    className={`news-card-description cursor-${activeTool}`}
                    onMouseUp={() => {
                        activeTool !== "note-creator"
                            ? addHighlight(link, "description")
                            : addNote(link, "description");
                    }}
                >
                    {createdFor === "news" ? (
                        <Highlighter
                            highlightClassName="news-card-highlight"
                            searchWords={[keyword]}
                            autoEscape={true}
                            textToHighlight={description || ""}
                        />
                    ) : description ? (
                        getEditedHtmlStructure(
                            description,
                            highlights && highlights["description"],
                            notes && notes["description"],
                            [keyword],
                            openNoteId,
                            setOpenNoteId,
                            setActiveTool,
                            newsCardRef,
                            favoriteNews,
                            setFavoriteNews
                        )
                    ) : null}
                </p>

                {isContentShown && (
                    <p
                        className={`news-card-full-text cursor-${activeTool}`}
                        onMouseUp={() => {
                            activeTool !== "note-creator"
                                ? addHighlight(link, "content")
                                : addNote(link, "content");
                        }}
                    >
                        {createdFor === "news" ? (
                            <Highlighter
                                highlightClassName="news-card-highlight"
                                searchWords={[keyword]}
                                autoEscape={true}
                                textToHighlight={content || ""}
                            />
                        ) : content ? (
                            getEditedHtmlStructure(
                                content,
                                highlights && highlights["content"],
                                notes && notes["content"],
                                [keyword],
                                openNoteId,
                                setOpenNoteId,
                                setActiveTool,
                                newsCardRef,
                                favoriteNews,
                                setFavoriteNews
                            )
                        ) : null}
                    </p>
                )}

                <div className="news-card-controls">
                    {content && (
                        <Button
                            text={
                                isContentShown ? "Hide full text" : "Read More"
                            }
                            buttonIconSrc={
                                isContentShown
                                    ? hideFullTextButtonIcon
                                    : readMoreButtonIcon
                            }
                            active={false}
                            onClick={() =>
                                setIsContentShown((prevState) => !prevState)
                            }
                        />
                    )}
                    <CustomLink
                        type="external"
                        content={
                            <>
                                <img
                                    src={originalSourceIcon}
                                    alt="#"
                                    aria-hidden={true}
                                />
                                <span className="news-card-link-add-text">
                                    Visit original source...
                                </span>
                            </>
                        }
                        href={link}
                        target="_blank"
                        hover="underline"
                        active=""
                    />
                    <Button
                        text={
                            isFavorite
                                ? "Remove from favorite"
                                : "Add to favorite"
                        }
                        buttonIconSrc={
                            isFavorite ? removeIcon : addToFavoriteButtonIcon
                        }
                        active={false}
                        onClick={() => {
                            isFavorite ? removeFromFavorite() : addToFavorite();
                        }}
                    />
                </div>
            </div>

            <footer className="news-card-footer">
                <p className="news-card-date">{pubDate}</p>
                {(creator || source_id) && (
                    <div className={`news-card-creators ${language}`}>
                        {creator
                            ? creator.map((currentCreator, index) => (
                                  <p key={index}>{currentCreator}</p>
                              ))
                            : source_id && <p>{source_id}</p>}
                    </div>
                )}
            </footer>
        </article>
    );
};

NewsCard.propTypes = {
    createdFor: oneOf(["favorite news", "news"]).isRequired,
    news: newsType.isRequired,
    keyword: string.isRequired,
    activeTool: toolType,
    isFavorite: bool.isRequired,
    openNoteId: requiredIf(string, (props) => props.createdFor !== "news"),
    setOpenNoteId: requiredIf(func, (props) => props.createdFor !== "news"),
    setActiveTool: requiredIf(func, (props) => props.createdFor !== "news"),
    addToFavorite: func.isRequired,
    removeFromFavorite: func.isRequired,
    addHighlight: requiredIf(func, (props) => props.createdFor !== "news"),
    addNote: requiredIf(func, (props) => props.createdFor !== "news"),
    favoriteNews: arrayOf(newsType).isRequired,
    setFavoriteNews: func.isRequired,
};

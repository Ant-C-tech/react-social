import "./styles.css";

import React from "react";
import { useEffect, useRef } from "react";
import {
    string,
    number,
    bool,
    func,
    arrayOf,
    element,
    oneOf,
} from "prop-types";
import { SkeletonTheme } from "react-loading-skeleton";
import { Waypoint } from "react-waypoint";
import requiredIf from "react-required-if";
import { newsType, toolType } from "@types";

import {
    addHighlight,
    getIsFavorite,
    addToFavorite,
    removeFromFavorite,
    addNote,
} from "./utils";

import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "./NewsCardSkeleton";

export const NewsFeed = ({
    newsSet,
    favoriteNews,
    setFavoriteNews,
    keyword,
    startNews,
    loading,
    setNeedMoreNews,
    needScroll,
    setNeedScroll,
    message,
    activeTool,
    setActiveTool,
    textOfNoteCard,
    setTextOfNoteCard,
    openNoteId,
    setOpenNoteId,
    createdFor,
}) => {
    const currentRef = useRef(null);

    useEffect(() => {
        if (needScroll) {
            currentRef.current &&
                currentRef.current.scrollIntoView({ block: "start" });
            setNeedScroll(false);
        }
    }, [needScroll, setNeedScroll]);

    return (
        <section className="news-feed">
            {loading ? (
                <SkeletonTheme baseColor="#dce2e4" highlightColor="#b2c0c4">
                    <NewsCardSkeleton skeletons={2} />
                </SkeletonTheme>
            ) : message ? (
                message
            ) : (
                <ul>
                    {newsSet.map((news, indexOfCurrentNews) => (
                        <li
                            className="news-list-item"
                            key={indexOfCurrentNews}
                            ref={
                                indexOfCurrentNews === startNews
                                    ? currentRef
                                    : null
                            }
                        >
                            <NewsCard
                                createdFor={createdFor}
                                news={news}
                                keyword={keyword}
                                activeTool={activeTool}
                                isFavorite={getIsFavorite(
                                    favoriteNews,
                                    news.link
                                )}
                                openNoteId={openNoteId}
                                setOpenNoteId={setOpenNoteId}
                                setActiveTool={setActiveTool}
                                addToFavorite={() => {
                                    addToFavorite(
                                        favoriteNews,
                                        setFavoriteNews,
                                        news
                                    );
                                }}
                                removeFromFavorite={() => {
                                    removeFromFavorite(
                                        favoriteNews,
                                        setFavoriteNews,
                                        news
                                    );
                                }}
                                addHighlight={(link, targetPart) => {
                                    addHighlight(
                                        favoriteNews,
                                        setFavoriteNews,
                                        activeTool,
                                        [keyword],
                                        link,
                                        targetPart
                                    );
                                }}
                                addNote={(link, targetPart) => {
                                    addNote(
                                        favoriteNews,
                                        setFavoriteNews,
                                        [keyword],
                                        link,
                                        targetPart,
                                        textOfNoteCard,
                                        setTextOfNoteCard,
                                        setActiveTool
                                    );
                                }}
                                favoriteNews={favoriteNews}
                                setFavoriteNews={setFavoriteNews}
                            />
                            {indexOfCurrentNews === newsSet.length - 1 && (
                                <Waypoint
                                    onEnter={() => {
                                        setNeedMoreNews(true);
                                    }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

NewsFeed.propTypes = {
    newsSet: arrayOf(newsType).isRequired,
    favoriteNews: arrayOf(newsType).isRequired,
    setFavoriteNews: func.isRequired,
    keyword: string.isRequired,
    startNews: number.isRequired,
    loading: bool.isRequired,
    setNeedMoreNews: func.isRequired,
    needScroll: bool.isRequired,
    setNeedScroll: func.isRequired,
    message: element,
    activeTool: toolType,
    setActiveTool: requiredIf(func, (props) => props.createdFor !== "news"),
    textOfNoteCard: requiredIf(string, (props) => props.createdFor !== "news"),
    setTextOfNoteCard: requiredIf(func, (props) => props.createdFor !== "news"),
    openNoteId: requiredIf(string, (props) => props.createdFor !== "news"),
    setOpenNoteId: requiredIf(func, (props) => props.createdFor !== "news"),
    createdFor: oneOf(["favorite news", "news"]).isRequired,
};

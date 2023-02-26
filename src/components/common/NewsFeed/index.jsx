import "./styles.css";

import React from "react";
import { useEffect, useRef } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Waypoint } from "react-waypoint";

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
    keywords,
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
                                keywords={keywords}
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
                                        keywords,
                                        link,
                                        targetPart
                                    );
                                }}
                                addNote={(link, targetPart) => {
                                    addNote(
                                        favoriteNews,
                                        setFavoriteNews,
                                        keywords,
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

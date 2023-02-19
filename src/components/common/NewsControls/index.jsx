import "./styles.css";

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import { Message, TabsControls, TabPanel } from "@common";

import { createErrorMessage } from "./utils/createErrorMessage";

import { FindNewsTab } from "./FindNewsTab";
import { EditNewsTab } from "./EditNewsTab";

export const NewsControls = (newsControlProps) => {
    const {
        news,
        error,
        loading,
        isHighLightersBar,
        setActiveTool,
        setKeyword,
    } = newsControlProps;

    const errorMessage = error && createErrorMessage(news, error);

    const [currentTab, setCurrentTab] = useState(0);

    const changeTab = (_event, newTab) => {
        setCurrentTab(newTab);
        setActiveTool("");
        setKeyword("");
    };

    return (
        <section className="news-controls">
            {error ? (
                <Message type={errorMessage.type} title={errorMessage.title}>
                    <p>{errorMessage.text}</p>
                </Message>
            ) : (
                !loading && (
                    <>
                        {isHighLightersBar && (
                            <TabsControls
                                tabs={["Find news", "Edit news"]}
                                currentTab={currentTab}
                                changeTab={changeTab}
                            />
                        )}

                        <TabPanel value={currentTab} index={0}>
                            <FindNewsTab findNewsTabProps={newsControlProps} />
                        </TabPanel>

                        <TabPanel value={currentTab} index={1}>
                            <EditNewsTab editNewsTabProps={newsControlProps} />
                        </TabPanel>
                    </>
                )
            )}
        </section>
    );
};

NewsControls.propTypes = {
    newsControlProps: PropTypes.shape({
        news: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                urlToImage: PropTypes.string.isRequired,
                publishedAt: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                source: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                }).isRequired,
                category: PropTypes.string.isRequired,
                language: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
            }).isRequired
        ).isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        isHighLightersBar: PropTypes.bool.isRequired,
        setActiveTool: PropTypes.func.isRequired,
        setKeyword: PropTypes.func.isRequired,
    }),
};

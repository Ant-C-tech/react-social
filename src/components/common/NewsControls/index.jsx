import "./styles.css";

import React from "react";
import { useState } from "react";

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

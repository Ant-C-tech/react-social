import React from "react";

import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const NoMatch = () => {
    return (
        <>
            <Content>
                <Message
                    type={"message-warning"}
                    title={"This page does not exist"}
                >
                    <p>Please, use the user interface for navigation.</p>
                </Message>
            </Content>
            <ControlBar />
        </>
    );
};

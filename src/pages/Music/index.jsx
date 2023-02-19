import React from "react";

import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Music = () => {
    return (
        <>
            <Content>
                <Message type={"message-info"} title={"Music"}>
                    <p>
                        Sorry, this functionality is in development at the
                        moment.
                    </p>
                </Message>
            </Content>
            <ControlBar />
        </>
    );
};

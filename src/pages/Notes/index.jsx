import React from "react";

import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Notes = () => {
    return (
        <>
            <Content>
                <Message type={"message-info"} title={"Notes"}>
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

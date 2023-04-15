import React from "react";

import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Contacts = () => {
    return (
        <>
            <Content>
                <Message type={"message-warning"} title={"Contact"}>
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

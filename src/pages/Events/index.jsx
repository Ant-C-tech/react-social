import React from "react";

import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Events = () => {
    return (
        <>
            <Content>
                <Message type={"message-info"} title={"Events"}>
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

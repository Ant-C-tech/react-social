import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Settings = () => {
    return (
        <>
            <Content>
                <Message type={"message-info"} title={"Settings"}>
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

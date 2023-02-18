import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Photos = () => {
    return (
        <>
            <Content>
                <Message type={"message-info"} title={"Photos"}>
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

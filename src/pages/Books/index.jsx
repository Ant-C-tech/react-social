import { ControlBar, Content } from "@sections";
import { Message } from "@common";

export const Books = () => {
    return (
        <>
            <Content>
                <Message type={"message-info"} title={"Books"}>
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

import { connect } from "react-redux";
import { StoreState } from "../../store/reducer";

interface IMessageProps {
    author: string;
    content: string;
    sameAuthor: boolean;
    messageCreatedByMe: boolean;
}

const Message = ({ author, content, sameAuthor, messageCreatedByMe }: IMessageProps) => {
    const alignClass = messageCreatedByMe
        ? "message_align_right"
        : "message_align_left";

    const authorText = messageCreatedByMe ? 'You' : author

    const contentAdditionalStyles = messageCreatedByMe
        ? "message_right_styles"
        : "message_left_styles"

    return (
        <div className={`message_container${alignClass}`}>
            {!sameAuthor && <p className="message_title">{authorText}</p>}
            <p className={`message_content ${contentAdditionalStyles}`}>{content}</p>
        </div>
    )
}

interface IMessagesProps {
    messages: ILocalMessageData[]
}
const Messages = ({ messages }: IMessagesProps) => {
    return <div className="messages_container">
        {messages.map((message, index) => {
            const sameAuthor = index > 0 && message.identity === messages[index - 1].identity;
            return (

                <Message
                    key={`${message.content}${index}`}
                    author={message.identity}
                    content={message.content}
                    sameAuthor={sameAuthor}
                    messageCreatedByMe={message.messageCreatedByMe}
                />
            )
        })}
    </div>
}

const mapStoreStateToprops = (state: StoreState) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToprops)(Messages);
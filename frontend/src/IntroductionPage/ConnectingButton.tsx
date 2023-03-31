interface IConnectingButtonProps {
    createRoomButton?: boolean;
    buttonText: string;
    onClickHandler: () => void;
}

const ConnectingButton = ({
    createRoomButton = false,
    buttonText,
    onClickHandler,
}: IConnectingButtonProps) => {
    const buttonClass = createRoomButton
        ? "create_room_button"
        : "join_room_button";

    return (
        <button className={buttonClass} onClick={onClickHandler}>
            {buttonText}
        </button>
    );
};

export default ConnectingButton;
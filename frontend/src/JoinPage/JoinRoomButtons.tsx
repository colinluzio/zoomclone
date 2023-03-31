import { useNavigate } from "react-router-dom";

interface IButtonProps {
    buttonText: string;
    cancelButton?: boolean;
    onClickHandler: () => void;
}

const Button = ({ buttonText, cancelButton = false, onClickHandler }: IButtonProps) => {
    const buttonClass = cancelButton
        ? "join_room_cancel_button"
        : "join_room_success_button";

    return (
        <button onClick={onClickHandler} className={buttonClass}>
            {buttonText}
        </button>
    );
};

interface JoinRoomButtonsProps {
    handleJoinRoom: () => void;
    isRoomHost: boolean;
}
const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }: JoinRoomButtonsProps) => {
    const successButtonText = isRoomHost ? "Host" : "Join";

    const navigate = useNavigate();

    const pushToIntroductionPage = () => {
        navigate("/");
    };

    return (
        <div className="join_room_buttons_container">
            <Button buttonText={successButtonText} onClickHandler={handleJoinRoom} />
            <Button
                buttonText="Cancel"
                cancelButton
                onClickHandler={pushToIntroductionPage}
            />
        </div>
    );
};

export default JoinRoomButtons;
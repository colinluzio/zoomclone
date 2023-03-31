import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import JoinRoomInputs from "./JoinRoomInputs"
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from "../store/actions";
import { StoreState } from "../store/reducer";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import { getRoomExists } from "../utils/api";


interface IJoinRoomContentProps {
    isRoomHost: boolean,
    setConnectOnlyWithAudio: (onlyWithAudio: boolean) => void;
    connectOnlyWithAudio: boolean,
    setIdentityAction: (name: string) => void;
    setRoomIdAction: (roomId: string) => void;
}

const JoinRoomContent = ({ isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio, setIdentityAction, setRoomIdAction }: IJoinRoomContentProps) => {

    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleJoinRoom = async () => {
        setIdentityAction(nameValue)
        if (isRoomHost) {
            createRoom();
        } else {
            await joinRoom();
        }

    };

    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue)

        const { roomExists, full } = responseMessage;

        if (roomExists) {
            if (full) {
                setErrorMessage('Meeting is full. Please try again later')
            } else {
                setRoomIdAction(roomIdValue)
                navigate('/room');
            }
        } else {
            setErrorMessage('Room not found. Check your meeting id')
        }
    }

    const createRoom = () => {
        navigate('/room')
    }

    return (
        <>
            <JoinRoomInputs
                roomIdValue={roomIdValue}
                setRoomIdValue={setRoomIdValue}
                nameValue={nameValue}
                setNameValue={setNameValue}
                isRoomHost={isRoomHost}
            />
            <OnlyWithAudioCheckbox
                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                connectOnlyWithAudio={connectOnlyWithAudio}
            />
            <ErrorMessage errorMessage={errorMessage} />
            <JoinRoomButtons
                handleJoinRoom={handleJoinRoom}
                isRoomHost={isRoomHost}
            />
        </>
    );
};

const mapStoreStateToProps = (state: StoreState) => {
    return {
        ...state,
    };
};

type JoinRoomPayload = { type: string; payload: boolean | {} }

const mapActionsToProps = (dispatch: (payload: JoinRoomPayload) => void) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio: boolean) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity: string) => dispatch(setIdentity({ identity })),
        setRoomIdAction: (roomId: string) => dispatch(setRoomId({ roomId }))
    };
};

export default connect(
    mapStoreStateToProps,
    mapActionsToProps
)(JoinRoomContent);
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import { StoreState } from "../store/reducer";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";

import "./JoinRoomPage.css";

type IsHostPayload = ReturnType<typeof setIsRoomHost>;

interface IJoinRoomPageProps {
    setIsRoomHostAction: (isHost: boolean) => void;
    isRoomHost: boolean;
}

const JoinRoomPage = ({ setIsRoomHostAction, isRoomHost }: IJoinRoomPageProps) => {

    const search = useLocation().search;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get("host");
        if (isRoomHost) {
            setIsRoomHostAction(true);
        }
    }, []);

    return (
        <div className="join_room_page_container">
            <div className="join_room_page_panel">
                <JoinRoomTitle isRoomHost={isRoomHost} />
                <JoinRoomContent />
            </div>
        </div>
    );
};

const mapStoreStateToProps = (state: StoreState) => {
    return {
        ...state,
    };
};
const mapActionsToProps = (dispatch: (isHost: IsHostPayload) => void) => {
    return {
        setIsRoomHostAction: (isRoomHost: boolean) => dispatch(setIsRoomHost({ isRoomHost })),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
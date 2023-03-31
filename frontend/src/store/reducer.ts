import { PayloadAction } from '@reduxjs/toolkit';
import Actions from "./actions";


const initialParticipants: IParticipant[] = [];
const initialMessages: ILocalMessageData[] = [];

export type StoreState = {
    identity: string,
    isRoomHost: boolean,
    connectOnlyWithAudio: boolean,
    roomId: null | string,
    showOverlay: boolean,
    participants: IParticipant[],
    messages: ILocalMessageData[]
}

const initState: StoreState = {
    identity: "",
    isRoomHost: false,
    connectOnlyWithAudio: false,
    roomId: null,
    showOverlay: true,
    participants: initialParticipants,
    messages: initialMessages
};

type PayloadActionType = {
    isRoomHost: boolean;
    onlyWithAudio: boolean;
    roomId: string;
    identity: string;
    showOverlay: boolean;
    participants: IParticipant[];
    messages: ILocalMessageData[];
}

const reducer = (state = initState, action: PayloadAction<PayloadActionType>) => {

    switch (action.type) {
        case Actions.SET_IS_ROOM_HOST:

            return {
                ...state,
                isRoomHost: action.payload.isRoomHost,
            };
        case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
            return {
                ...state,
                connectOnlyWithAudio: action.payload.onlyWithAudio,
            };
        case Actions.SET_ROOM_ID:
            return {
                ...state,
                roomId: action.payload.roomId
            };
        case Actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.payload.identity
            };
        case Actions.SET_SHOW_OVERLAY:
            return {
                ...state,
                showOverlay: action.payload.showOverlay
            };
        case Actions.SET_PARTICIPANTS:
            return {
                ...state,
                participants: action.payload.participants
            };
        case Actions.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload.messages
            };
        default:
            return state;
    }
};

export default reducer;
export const Actions = {
    SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
    SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
    SET_IDENTITY: "SET_IDENTITY",
    SET_ROOM_ID: "SET_ROOM_ID",
    SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
    SET_PARTICIPANTS: 'SET_PARTICIPANTS',
    SET_MESSAGES: 'SET_MESSAGES'
};

export const setIsRoomHost = ({ isRoomHost }: { isRoomHost: boolean }) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        payload: { isRoomHost },
    };
};

export const setConnectOnlyWithAudio = (onlyWithAudio: boolean) => {
    return {
        type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
        payload: onlyWithAudio,
    };
};

export const setIdentity = ({ identity }: { identity: string }) => {
    return {
        type: Actions.SET_IDENTITY,
        payload: { identity }
    };
}

export const setRoomId = ({ roomId }: { roomId: string }) => {
    return {
        type: Actions.SET_ROOM_ID,
        payload: { roomId }
    };
}

export const setShowOverlay = (showOverlay: boolean) => {
    return {
        type: Actions.SET_SHOW_OVERLAY,
        payload: showOverlay,
    }
}

export const setParticipants = (participants: string[]) => {
    return {
        type: Actions.SET_PARTICIPANTS,
        payload: { participants },
    }
}

export const setMessages = (messages: ILocalMessageData[]) => {
    return {
        type: Actions.SET_MESSAGES,
        payload: { messages }
    };
}
export default Actions;
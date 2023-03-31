type SignalPick<T, K extends keyof T> = {
    [key in K]: T[key];
}

interface ILocalMessageData {
    content: string;
    identity: string;
    messageCreatedByMe: boolean;
}

interface IParticipant {
    socketId: string;
    identity: string;
    onlyAudio: string;
}

interface ISignalData {
    signal: SimplePeer.Instance;
    connUserSocketId: string;
    socketId?: string;
}

interface IIdentityId {
    identity: string
}
interface IRoomId {
    roomId: string
}

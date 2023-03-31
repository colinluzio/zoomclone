interface IUser {
    identity: string;
    id: string;
    socketId: string;
    roomId: string;
}
interface IRoom {
    id: string;
    connectedUsers: IUser[]
}

interface ServerToClientEvents {
    joinRoom: (data: SocketData) => void;
    connPrepare: (data: EmitSocketData) => void;
    roomUpdate: (data: EmitSocketData) => void;
    userDisconnected: (data: EmitSocketData) => void;
    connSignal: (data: SignallingData) => void;
    connInit: (data: EmitSocketData) => void;
}

interface ClientToServerEvents {
    createNewRoom: (data: SocketData) => void;
    joinRoom: (data: SocketData) => void;
    disconnect: () => void;
    connSignal: (data: SocketData) => void;
    connInit: (data: SocketData) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    connUserSocketId: string;
    roomId: string;
    socketId: string;
    identity: string;
    signal: {}
}
interface EmitSocketData {
    connUserSocketId?: string;
    socketId?: string;
    connectedUsers?: IUser[];
}
interface SignallingData {

}

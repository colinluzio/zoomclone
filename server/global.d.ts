declare namespace NodeJS {
    export interface SocketData {
        connUserSocketId: string;
        roomId: string;
        socketId?: string;
        identity: string;
        signal: {}
    }
}
import io, { Socket } from "socket.io-client";
import { setRoomId, setParticipants } from "../store/actions";
import { store } from "../store/store";
import * as webRTCHandler from "./webRTCHandler";
import * as SimplePeer from 'simple-peer';

const SERVER = "http://localhost:5002";

let socket: Socket;

export const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on("connect", () => {
        console.log("successfully connected with socket io server");
        console.log(socket.id);
    });

    socket.on("room-id", (data) => {
        const { roomId } = data;
        store.dispatch(setRoomId({ roomId }));
    });

    socket.on("roomUpdate", (data) => {
        console.log('room is updated')
        const { connectedUsers } = data;
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on("connPrepare", (data) => {
        const { connUserSocketId } = data;

        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

        // inform the user which just join the room that we have prepared for incoming connection
        socket.emit("connInit", { connUserSocketId: connUserSocketId });
    });

    socket.on("connSignal", (data) => {
        webRTCHandler.handleSignalingData(data);
    });

    socket.on("connInit", (data) => {
        const { connUserSocketId } = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on("userDisconnected", (data) => {
        webRTCHandler.removePeerConnection(data);
    });
};

export const createNewRoom = (identity: string, onlyAudio: boolean) => {
    // emit an event to server that we would like to create new room
    const data = {
        identity,
        onlyAudio,
    };

    socket.emit("createNewRoom", data);
};

export const joinRoom = (identity: string, roomId: string | null, onlyAudio: boolean) => {
    //emit an event to server that we would to join a room
    const data = {
        roomId,
        identity,
        onlyAudio,
    };

    socket.emit("joinRoom", data);
};

export const signalPeerData = (data: ISignalData) => {
    socket.emit("connSignal", data);
};
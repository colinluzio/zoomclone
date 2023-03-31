'use strict';
import { Express } from "express";
import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

module.exports = function (app: Express, rooms: IRoom[], io: Server, connectedUsers: IUser[]) {

    app.get("/api/room-exists/:roomId", (req, res) => {

        const { roomId } = req.params;
        const room = rooms.find((room: IRoom) => room.id === roomId);

        if (room) {
            // send reponse that room exists
            if (room.connectedUsers.length > 3) {
                return res.send({ roomExists: true, full: true });
            } else {
                return res.send({ roomExists: true, full: false });
            }
        } else {
            // send response that room does not exists
            return res.send({ roomExists: false });
        }
    });

    io.on("connection", (socket) => {
        console.log(`user connected ${socket.id}`);

        socket.on("createNewRoom", (data) => {
            createNewRoomHandler(data, socket);
        });

        socket.on("joinRoom", (data) => {
            joinRoomHandler(data, socket);
        });

        socket.on("disconnect", () => {
            disconnectHandler(socket);
        });

        socket.on("connSignal", (data) => {
            signalingHandler(data, socket);
        });

        socket.on("connInit", (data) => {
            initializeConnectionHandler(data, socket);
        });
    });

    // socket.io handlers
    const createNewRoomHandler = (data: SocketData, socket: Socket) => {
        console.log("host is creating new room");
        const { identity } = data;

        const roomId = uuidv4();

        // create new user
        const newUser = {
            identity,
            id: uuidv4(),
            socketId: socket.id,
            roomId,
        };

        // push that user to connectedUsers
        connectedUsers = [...connectedUsers, newUser];

        //create new room
        const newRoom = {
            id: roomId,
            connectedUsers: [newUser],
        };

        // join socket.io room
        socket.join(roomId);

        rooms = [...rooms, newRoom];

        // emit to that client which created that room roomId
        socket.emit("room-id", { roomId });

        // emit an event to all users connected
        // to that room about new users which are right in this room
        socket.emit("roomUpdate", { connectedUsers: newRoom.connectedUsers });
    };

    const joinRoomHandler = (data: SocketData, socket: Socket) => {
        const { identity, roomId } = data;

        const newUser = {
            identity,
            id: uuidv4(),
            socketId: socket.id,
            roomId,
        };

        // join room as user which just is trying to join room passing room id
        const room = rooms.find((room) => room.id === roomId);

        if (room) {
            room.connectedUsers = [...room.connectedUsers, newUser];

            // join socket.io room
            socket.join(roomId);

            // add new user to connected users array
            connectedUsers = [...connectedUsers, newUser];

            // emit to all users which are already in this room to prepare peer connection
            room.connectedUsers.forEach((user) => {
                if (user.socketId !== socket.id) {
                    const data = {
                        connUserSocketId: socket.id,
                    };

                    io.to(user.socketId).emit("connPrepare", data);
                }
            });

            io.to(roomId).emit("roomUpdate", { connectedUsers: room.connectedUsers });
        }
    };

    const disconnectHandler = (socket: Socket) => {
        // find if user has been registered - if yes remove him from room and connected users array
        const user = connectedUsers.find((user) => user.socketId === socket.id);

        if (user) {
            // remove user from room in server
            const room = rooms.find((room) => room.id === user.roomId);

            if (room) {

                room.connectedUsers = room.connectedUsers.filter(
                    (user) => user.socketId !== socket.id
                );

                // leave socket io room
                socket.leave(user.roomId);

                // close the room if amount of the users which will stay in room will be 0
                if (room.connectedUsers.length > 0) {
                    // emit to all users which are still in the room that user disconnected
                    io.to(room.id).emit("userDisconnected", { socketId: socket.id });

                    // emit an event to rest of the users which left in the toom new connectedUsers in room
                    io.to(room.id).emit("roomUpdate", {
                        connectedUsers: room.connectedUsers,
                    });
                } else {
                    rooms = rooms.filter((r) => r.id !== room.id);
                }
            }
        }
    };

    const signalingHandler = (data: SocketData, socket: Socket) => {
        const { connUserSocketId, signal } = data;

        const signalingData = { signal, connUserSocketId: socket.id };
        io.to(connUserSocketId).emit("connSignal", signalingData);
    };

    // information from clients which are already in room that They have preapred for incoming connection
    const initializeConnectionHandler = (data: SocketData, socket: Socket) => {
        const { connUserSocketId } = data;

        const initData = { connUserSocketId: socket.id };
        io.to(connUserSocketId).emit("connInit", initData);
    };

}
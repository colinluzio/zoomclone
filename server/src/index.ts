import express from "express"
import http from "http"
import { Server } from "socket.io";
const cors = require("cors");
const PORT = process.env.PORT || 5002;

let connectedUsers: IUser[] = [];
let rooms: IRoom[] = [];

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

require('./routes')(app, rooms, io, connectedUsers);

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

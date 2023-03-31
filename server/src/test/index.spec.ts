import request from 'supertest';
import http from "http"
import express, { Express } from "express";
import { Server, Socket } from "socket.io";

const routes = require('../routes');

let connectedUsers: IUser[] = [];

describe('Main route', () => {

    const setUpTest = async (rooms: IRoom[]) => {
        const app = express();
        const server = http.createServer(app);
        const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        return { app, io }

    }

    test('room does not exist', async () => {
        const rooms = [{ id: '5027', connectedUsers: [] }];
        const { app, io } = await setUpTest(rooms);
        routes(app, rooms, io, connectedUsers);
        const res = await request(app).get('/api/room-exists/1234');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);

        const json = JSON.parse(res.text);
        expect(json.roomExists).toEqual(false);
    });

    test('room exists', async () => {
        const rooms = [{ id: '1234', connectedUsers: [] }];
        const { app, io } = await setUpTest(rooms);
        routes(app, rooms, io, connectedUsers);
        const res = await request(app).get('/api/room-exists/1234');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);

        const json = JSON.parse(res.text);
        expect(json.roomExists).toEqual(true);
    });

});

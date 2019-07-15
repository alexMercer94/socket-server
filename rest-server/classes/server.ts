import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/sockets';

export default class Server {
    // Singleton Pattern
    private static _instance: Server;

    // Class Properties
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }
    /**
     * It Implements Singleton Pattern
     */
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * Listen connections
     */
    private listenSockets() {
        console.log('Listen connections - Sockets');

        this.io.on('connection', client => {
            // Connect client
            socket.connectClient(client, this.io);

            // Setting User
            socket.user(client, this.io);

            // Get active users
            socket.getUsers(client, this.io);

            // Messages
            socket.message(client, this.io);

            // Disconnect
            socket.disconnect(client, this.io);
        });
    }

    /**
     * Start server
     * @param callback Fuction in order to execute
     */
    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }
}

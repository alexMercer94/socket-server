import socketIO, { Socket } from 'socket.io';
import { User } from '../classes/user';
import { UsersList } from '../classes/user-list';

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    usersConnected.add(user);
};

/**
 * Listen socket `disconnect`
 * @param client Client to listen
 */
export const disconnect = (client: Socket): void => {
    client.on('disconnect', () => {
        console.log('Cliente disconnected');
        usersConnected.deleteUser(client.id);
    });
};

/**
 * Listen socket `message` from client
 * @param clien Cliento to listen
 */
export const message = (client: Socket, io: socketIO.Server): void => {
    client.on('message', (payload: { from: string; message: string }, callback) => {
        console.log('Message received: ', payload);
        io.emit('new-message', payload);
    });
};

/**
 * Listen socket `set-user` from client
 * @param client Cliento to listen
 * @param io Socket IO Server
 */
export const user = (client: Socket, io: socketIO.Server): void => {
    client.on('set-user', (payload: { name: string }, callback: Function) => {
        usersConnected.updateName(client.id, payload.name);

        callback({
            ok: true,
            message: `User ${payload.name}, configured`
        });
    });
};

export const usersConnected = new UsersList();

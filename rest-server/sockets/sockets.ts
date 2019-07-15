import socketIO, { Socket } from 'socket.io';
import { User } from '../classes/user';
import { UsersList } from '../classes/user-list';

export const connectClient = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    usersConnected.add(user);
};

/**
 * Listen socket `disconnect`
 * @param client Client to listen
 */
export const disconnect = (client: Socket, io: socketIO.Server): void => {
    client.on('disconnect', () => {
        console.log('Cliente disconnected');
        usersConnected.deleteUser(client.id);
        io.emit('active-users', usersConnected.getList());
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
        io.emit('active-users', usersConnected.getList());

        callback({
            ok: true,
            message: `User ${payload.name}, configured`
        });
    });
};

/**
 * Listen socket `get-users` from client
 * @param client Cliento to listen
 * @param io Socket IO Server
 */
export const getUsers = (client: Socket, io: socketIO.Server): void => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', usersConnected.getList());
    });
};

export const usersConnected = new UsersList();

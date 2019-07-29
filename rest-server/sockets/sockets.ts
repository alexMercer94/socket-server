import socketIO, { Socket } from 'socket.io';
import { User } from '../classes/user';
import { UsersList } from '../classes/user-list';
import { map } from '../routes/router';

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

// * Mapas

/**
 * Listen socket `new-marker` from client to add new marker
 * @param client Cliento to listen
 */
export const newMarker = (client: Socket) => {
    client.on('new-marker', marker => {
        map.addMarker(marker);
        client.broadcast.emit('new-marker', marker);
    });
};

/**
 * Listen socket `delete-marker` from client to delete a marker
 * @param client Cliento to listen
 */
export const deleteMarker = (client: Socket) => {
    client.on('delete-marker', (idMarker: string) => {
        map.deleteMarker(idMarker);
        client.broadcast.emit('delete-marker', idMarker);
    });
};

/**
 * Listen socket `move-marker` from client to move a marker
 * @param client Cliento to listen
 */
export const moveMarker = (client: Socket) => {
    client.on('move-marker', marker => {
        map.moveMarker(marker);
        client.broadcast.emit('move-marker', marker);
    });
};

export const usersConnected = new UsersList();

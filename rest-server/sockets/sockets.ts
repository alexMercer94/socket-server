import socketIO, { Socket } from 'socket.io';

/**
 * Listen socket `disconnect`
 * @param client Client to listen
 */
export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente disconnected');
    });
};

/**
 * Listen socket `message` from client
 * @param clien Cliento to listen
 */
export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { from: string; message: string }, callback) => {
        console.log('Message received: ', payload);
        io.emit('new-message', payload);
    });
};

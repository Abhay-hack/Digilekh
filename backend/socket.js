let io;

module.exports = {
    init: (server) => {
        io = require('socket.io')(server, {
            cors: {
                origin: 'http://localhost:5173', // Replace with frontend URL
                methods: ['GET', 'POST'],
            },
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket.io has not been initialized!');
        }
        return io;
    },
};

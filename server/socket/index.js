const io = require('socket.io');

class SocketServer {
  constructor() {
    this.socketServer = null;
  }

  setServer(server) {
    this.socketServer = io(server, {
      cors: {
        origin: 'http://localhost:5500',
      },
    });

    this.socketServer.on('connection', () => {
      console.log('connected');
    });
  }

  emit(trigger, data) {
    this.socketServer.emit(trigger, data);
  }
}

const server = new SocketServer();

const setSocketServer = (httpServer) => {
  server.setServer(httpServer);
};

const getSocketServer = () => server;

module.exports = {
  setSocketServer,
  getSocketServer,
};

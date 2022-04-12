const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //HTTP server
        this.server = http.createServer(this.app);

        //Configuracion socket.io
        this.io = socketIO(this.server,{/*configuraciones*/});
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute(){
        //inicializar middlewares
        this.middlewares();

        //inicializar sockets
        this.configurarSockets();

        //inicializar servidor
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });

    }
}

module.exports = Server;
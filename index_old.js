//Servidor de Express
const express = require('express');
const app = express();

//Servidor de sockets
const server = require('http').createServer(app);

//Configuración de socket server
const io = require('socket.io')(server);

//desplegar directory publico
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Client connected',socket.id);
    //evento,payload
    socket.emit('message-welcome', {
        message: 'Welcome to the chat app',
        date: new Date()
    });

    socket.on('message-to-server',(data)=>{
        console.log(data);
        //solo quien mando el mensaje puede recibir el mensaje
        // socket.emit('message-from-server',data);

        //todos los clientes pueden recibir el mensaje
        io.emit('message-from-server',data);
    })

    socket.on('message-from-server',(data)=>{
        console.log(data);
    })
});

server.listen(3000,()=>{
    console.log('Servidor corriendo en el puerto 3000');
});
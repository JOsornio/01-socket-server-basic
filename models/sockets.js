
class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {

        //On connection
        this.io.on('connection', (socket) => {
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
                this.io.emit('message-from-server',data);
            })

            socket.on('message-from-server',(data)=>{
                console.log(data);
            })
        });
    }
}

module.exports = Sockets;
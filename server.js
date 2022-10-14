const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const Contenedor = require('./src/containers/productos')

app.use(express.static('public'));

const contenedorProductos = new Contenedor('productos.txt')
const contenedorMensajes = new Contenedor('mensajes.txt');

contenedorProductos.deleteAll();
contenedorMensajes.deleteAll();

const productos = [
];

const mensajes = [
];

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('productos',productos);
    socket.emit('mensajes',mensajes);

    socket.on('nuevo-producto', function(producto){
        if(productos.length==0){
            productos.push(producto);
            contenedorProductos.save(producto);
        }
        else{
            productos.push(producto);
            contenedorProductos.save(producto);
        }
        io.sockets.emit('productos',productos);
    })

    socket.on('nuevo-mensaje',function(mensaje){
        if(mensajes.length==0){
            mensajes.push(mensaje);
            contenedorMensajes.save(mensaje);
        }
        else{
            mensajes.push(mensaje);
            contenedorMensajes.save(mensaje);  
        }
    })
    io.sockets.emit('mensajes',mensajes);
});



const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))
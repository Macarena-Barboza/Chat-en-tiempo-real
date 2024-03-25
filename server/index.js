import express from "express";
import { Server } from "socket.io";
import { createServer } from 'node:http';

const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: '*'
    },
})

io.on('connection', async (socket) => {
    console.log(`usuario Conectado!!! ${socket.id}`)

    socket.on('registro', (user) => {
        io.emit('registro', user)
    })

    socket.broadcast.emit('chat', {
        contenido: 'se conecto',
        id: socket.id,
        user: socket.id
    })

    socket.on('disconnect', () => {
        console.log('usuario Desconectado...')
        io.emit('chat', {
            contenido: 'se desconecto',
            id: socket.id,
            user: socket.id
        })
    })

    socket.on('chat', async (msj) => {
        io.emit('chat', msj);
        console.log(msj)
    })

})

app.get('/', (req, res) => {
    res.send('<h1>Holis</h1>')
})

const port = process.env.PORT ?? 3001

server.listen(port, () => {
    console.log(`server list http://localhost:${port}`)
})


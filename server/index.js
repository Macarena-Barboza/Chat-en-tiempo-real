import express from "express";
import { Server } from "socket.io";
import { createServer } from 'node:http';
import { db } from "./db.js";



const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    },
})

io.on('connection', (socket) => {
    console.log('usuario Conectado!!!')
    console.log(socket.id)

    socket.broadcast.emit('chat', {
        mensajeChat: ' se conecto',
        usuario: socket.id
    })


    socket.on('disconnect', () => {
        console.log('usuario Desconectado...')
    })

    socket.on('chat', async (msj) => {



        io.emit('chat', msj);
    })
})



app.get('/', (req, res) => {
    res.send('<h1>Holis</h1>')
})




const port = process.env.PORT ?? 3001

server.listen(port, () => {
    console.log(`server list http://localhost:${port}`)
})

console.log(process.env.PORT)

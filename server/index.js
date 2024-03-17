import express from "express";
import { Server } from "socket.io";
import { createServer } from 'node:http';

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('usuario conectado')
})


// Chequea si conecto el servidor
app.get('/', (req, res) => {
    res.send('<h1>Holis</h1>')
})



// Ejecuta el Servidor 
const port = process.env.PORT ?? 3001

server.listen(port, () => {
    console.log(`server list http://localhost:${port}`)
})


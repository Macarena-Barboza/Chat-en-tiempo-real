import { useEffect, useState } from 'react';
import './App.css'
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
    const [mensaje, setMensaje] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [mensajes, setMensajes] = useState([]);


    useEffect(() => {
        socket.on('connect', () => setIsConnected(true))
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault()
        socket.emit('chat', {
            usuario: socket.id,
            mensajeChat: mensaje
        })
    }

    return (
        <>
            <h1>Holis</h1>
            <h4>{isConnected ? 'Conectado' : 'No Conectado'}</h4>
            <form onSubmit={handlerSubmit}>
                <input type="text" onChange={e => setMensaje(e.target.value)} />
                <button type='submit'>Enviar</button>
            </form>
        </>
    )
}

export default App

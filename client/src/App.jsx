import { useEffect, useState } from 'react';
import './App.css'
import io from 'socket.io-client';
const socket = io('/');

function App() {
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [mensajes, setMensajes] = useState([]);


    useEffect(() => {
        socket.on('connect', () => setIsConnected(true))


        socket.on('chat', (msj) => {
            setMensajes(mensajes => [...mensajes, msj])
        })

        return () => {
            socket.off('connect');
            socket.off('chat');
        }
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault()
        socket.emit('chat', {
            usuario: socket.id,
            mensajeChat: nuevoMensaje
        })

    }

    return (
        <>
            <h1>Holis Chat</h1>
            <h4>{isConnected ? 'Conectado' : 'No Conectado'}</h4>
            <div>
                <div>
                    {mensajes.map((mensaje, id) => (
                        <li key={id} className={`msj ${mensaje.usuario === socket.id ? 'msj2' : 'msj1'}`}>
                            {mensaje.usuario.slice(0, 5)}: {mensaje.mensajeChat}
                        </li>
                    ))}

                </div>
                <form onSubmit={handlerSubmit}>
                    <input type="text" placeholder='Mensaje' onChange={e => setNuevoMensaje(e.target.value)} />
                    <button type='submit'>Enviar</button>
                </form>
            </div >
        </>
    )
}

export default App

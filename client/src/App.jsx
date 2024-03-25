import { useEffect, useState, useRef } from 'react';
import './App.css'
import io from 'socket.io-client';
const socket = io('/#');

function App() {
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const [login, setLogin] = useState(false);
    const [nuevoUser, setNuevoUser] = useState('');

    useEffect(() => {
        socket.on('connect', () => setIsConnected(true), console.log('conectado'))
        socket.on('disconnect', () => setIsConnected(false))

        socket.on('registro', (user) => {
            setNuevoUser(nuevoUser => [...nuevoUser, user])
        })

        socket.on('chat', (msj) => {
            setMensajes(mensajes => [...mensajes, msj])
        })

        return () => {
            socket.off('chat');
            socket.off('connect');
            socket.off('registro');
            socket.off('disconnect');
        }
    }, [])
    useEffect(() => {
        myRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mensajes])

    const handlerSubmit = (e) => {
        e.preventDefault()

        socket.emit('chat', {
            id: socket.id,
            contenido: nuevoMensaje,
            user: nuevoUser,
        })
        e.target.reset()
    }
    const handlerSubmitRegister = (e) => {
        e.preventDefault()
        setLogin(true);
        console.log('logueado')
    }
    const myRef = useRef(null);

    return (
        <>
            <h1>Holis Chat</h1>
            {login ?
                <>
                    <h4 >{nuevoUser}: {isConnected ? 'Conectado' : 'No Conectado'}</h4>
                    <section>
                        <div className='conte-msj'>
                            {mensajes.map((mensaje, index) => (
                                <div key={index} className='contMsj' ref={myRef} >
                                    <p className={`user button ${mensaje.id === socket.id ? 'user1' : 'user2'}`}>
                                        {mensaje.id === socket.id ? nuevoUser.slice(0, 1) : mensaje.user.slice(0, 1)}
                                    </p>
                                    <span className={`nombUser ${mensaje.id === socket.id ? 'nombUser1' : 'nombUser2'}`}>
                                        {mensaje.id === socket.id ? nuevoUser : mensaje.user.slice(0, 4)}
                                    </span>
                                    <p className={`msj ${mensaje.id === socket.id ? 'msj2' : 'msj1'}`} >
                                        <span className='text' >{mensaje.contenido}</span>
                                    </p>
                                </div>
                            ))}
                        </div >
                        <form onSubmit={handlerSubmit}>
                            <input type="text" placeholder='Mensaje' maxLength={33} onChange={e => setNuevoMensaje(e.target.value)} />
                            <button className='button' type='submit' >
                                <svg width="20" height="20" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.2675 0.737193C41.9544 0.424131 41.5575 0.208252 41.1245 0.115545C40.6915 0.0228377 40.241 0.0572551 39.8271 0.214654L1.54299 14.7051H1.53533C1.09391 14.8748 0.715663 15.1767 0.452245 15.5695C0.188826 15.9623 0.0530814 16.4269 0.0635514 16.8997C0.0740215 17.3725 0.230196 17.8306 0.510743 18.2113C0.791291 18.5921 1.18253 18.8769 1.63104 19.027L1.67027 19.0395L14.8103 24.6505C15.0666 24.7283 15.3388 24.7376 15.5998 24.6773C15.8608 24.617 16.1013 24.4893 16.2975 24.307L37.3867 4.65624C37.4495 4.5934 37.5241 4.54355 37.6062 4.50954C37.6883 4.47553 37.7763 4.45803 37.8652 4.45803C37.9541 4.45803 38.0421 4.47553 38.1242 4.50954C38.2063 4.54355 38.2809 4.5934 38.3437 4.65624C38.4065 4.71908 38.4564 4.79368 38.4904 4.87578C38.5244 4.95788 38.5419 5.04588 38.5419 5.13475C38.5419 5.22362 38.5244 5.31162 38.4904 5.39372C38.4564 5.47583 38.4065 5.55043 38.3437 5.61327L18.692 26.6928C18.5097 26.889 18.382 27.1296 18.3217 27.3906C18.2614 27.6516 18.2707 27.9238 18.3485 28.1801L23.9614 41.3278C23.9672 41.3469 23.9729 41.3641 23.9796 41.3823C24.2859 42.2695 25.0611 42.8954 25.998 42.9375H26.0937C26.5667 42.9402 27.0296 42.8005 27.4221 42.5367C27.8147 42.2728 28.1188 41.8969 28.2949 41.4579L42.7834 3.18432C42.943 2.77019 42.9793 2.31868 42.8877 1.8844C42.7962 1.45011 42.5808 1.05164 42.2675 0.737193Z" fill="#F5F5F5" />
                                </svg>
                            </button>
                        </form>
                    </section >
                </>
                :
                <form onSubmit={handlerSubmitRegister} className='login' >
                    <input type="text" placeholder='Nombre' maxLength={8} onChange={e => setNuevoUser(e.target.value)} />
                    <button type='submit' className='btnLogin'>Sign In</button>
                </form >
            }
        </>
    )
}

export default App

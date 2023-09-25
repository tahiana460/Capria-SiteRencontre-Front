import { useEffect } from 'react';
import io from 'socket.io-client';

export default function Profile_component(props) {
    const socket = io('localhost:3100');
    
    useEffect(() => {
        const sender = JSON.parse(localStorage.getItem('user'))[0];
        var data = {
            senderId: sender.id,
            senderPseudo: sender.pseudo,
            receiverId: props.visitedId,
            type: 1
        };
        socket.on('connect', () => {
            socket.emit('sendNotification', data);
            // socket.on('getOnlineUsers', users => {
            //     console.log(users);
            // })
        })
    }, [])

    return (
        <>
        </>
    );
}
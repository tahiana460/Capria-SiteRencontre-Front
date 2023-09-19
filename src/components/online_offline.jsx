import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import api from '../const/api';

export default function Online_offline(props) {
    const socket = io(api(''));

    const [onlineUsers, setOnlineUsers] = useState()

    useEffect(() => {
        // Tab has focus
        // const handleFocus = async () => {
        //   socket.emit("client_connect", props.user.id);
        // };

        socket.on('connect', function() {
            socket.emit("client_connect", props.user.id)
            // socket.on('getOnlineUsers', users => {
            //     // setOnlineUsers(users)
            //     console.log('online_offline', users);
            // })
        })

        socket.on('disconnect', () => {
            socket.emit("client_disconnect", props.user.id)
        })
    
        // Tab closed
        // const handleBlur = () => {
        //     socket.emit("client_disconnect", props.user.id);
        // };
    
        // Track if the user changes the tab to determine when they are online
        // window.addEventListener('focus', handleFocus);
        // window.addEventListener('blur', handleBlur);

        // window.addEventListener('beforeunload', handleBlur);
    
        return () => {
        //   window.removeEventListener('focus', handleFocus);
        //   window.removeEventListener('blur', handleBlur);
        //   window.removeEventListener('beforeunload', handleBlur);
        };   
      }, []);
}
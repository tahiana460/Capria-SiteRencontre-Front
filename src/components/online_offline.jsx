import {useEffect } from 'react';
import io from 'socket.io-client';

export default function Chat(props) {
    const socket = io('localhost:3100');

    useEffect(() => {
        // Tab has focus
        // const handleFocus = async () => {
        //   socket.emit("client_connect", props.user.id);
        // };

        socket.on('connect', function() {
            socket.emit("client_connect", props.user.id)
        })

        socket.on('disconnect', () => {
            socket.emit("client_disconnect", props.user.id)
        })
    
        // Tab closed
        const handleBlur = () => {
            socket.emit("client_disconnect", props.user.id);
        };
    
        // Track if the user changes the tab to determine when they are online
        // window.addEventListener('focus', handleFocus);
        // window.addEventListener('blur', handleBlur);

        window.addEventListener('beforeunload', handleBlur);
    
        return () => {
        //   window.removeEventListener('focus', handleFocus);
        //   window.removeEventListener('blur', handleBlur);
          window.removeEventListener('beforeunload', handleBlur);
        };   
      }, []);
}
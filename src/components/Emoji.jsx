

import { useState, useEffect } from 'react';
import api from '../const/api';
import Message from './Message'

export default function Emoji(props) {

    const [message,setMessage]=useState()
    const [messages,setMessages]=useState([])
    var msgs=[]
    console.log('USER')
    console.log(localStorage.getItem('user'))
    const valeur='x1f602'
    const messagess=()=>{
        fetch(api('messages'), {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({'mon_id': 1, 'receiver_id': 84})
        }).then((res) => {
            res.json().then((res) => {
                setMessages(res);
                console.log(res)
                console.log(messages)
                /*var rendus=[]
                res.map((r)=>{
                    rendus.push(<span>{r.message}</span>)
                })
                setMessages(rendus)*/
            })
        })
    }    
    
    useEffect(()=>{
        messagess();
    },[])

    return(
        <>          
        <p>{'coucou'+String.fromCodePoint(128514)}</p>  
        {messages.map((message)=>{
            return(<Message message={message.message} />)
        })}
             
        </>
      
    )
}
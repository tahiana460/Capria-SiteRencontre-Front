

import { useState, useEffect } from 'react';
import api from '../const/api';

export default function Message(props) {

    const valeur=props.message
    /*const [messages,setMessages]=useState([])
    const messagess=()=>{
        fetch(api('messages'), {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({'mon_id': 1, 'receiver_id': 84})
        }).then((res) => {
            res.json().then((res) => {
                setMessages(res);
                /*var rendus=[]
                res.map((r)=>{
                    rendus.push(<span>{r.message}</span>)
                })
                setMessages(rendus)
            })
        })
    }    
    
    useEffect(()=>{
        messagess();
    },[])
    const traduction = (message)=>{
        return message.replace('\\u', '&#');               
    }*/
    const traduction = (message)=>{
        var splits=message.split(/\\u/g) 
        console.log(splits)
        for(let i=0;i<splits.length;i++){
            if(splits[i].match(/[0-9a-f]/gi)){
                //splits[i]=String.fromCodePoint(splits[i])
                try {
                    splits[i]=String.fromCodePoint(splits[i]);             
                } catch (e) {             
                    console.log("'Argument is not a valid code point'" +
                        " error has occurred");
                }
            }
        }
        const newVal=splits.join('')
        console.log(newVal)
        return newVal//message.replace('\\u', '&#');               
    }
    return(
        <p>
        {traduction(valeur)} 
        </p>
      
    )
}
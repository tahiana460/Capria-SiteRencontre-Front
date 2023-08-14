import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import api from '../const/api';
import './assistance.css';

export default function Chat(props) {

    const [messages, setMessages] = useState([])
    const [yourMessage, setYourMessage] = useState()
    const [autoReply, setAutoReply] = useState(false)
    // const [msgAuto, setMsgAuto] = useState({})

    const messagesEndRef = useRef(null)
    
    const msgCardBodyRef = useRef(null)
    
    const messageAuto = "Bonjour "+props.user.nom+"! Nous avons bien reçu votre message hihi"


    const socket = io('localhost:3100');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        fetch(api('messages'), {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({'mon_id': props.user.id, 'receiver_id': props.admin.id})
        }).then((res) => {
            res.json().then((res) => {
                setMessages(res);
            })
        })

        fetch(api('messages/lastMessage/'+props.user.id+'/'+props.admin.id), {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        }).then((res) => {
            res.json().then((res) => {
                const messageDate = new Date(res.send_time);
                const today = new Date();
                const differenceS = Math.abs(today - messageDate)/1000;
                if (differenceS > 86400) {
                    setAutoReply(true);
                } else setAutoReply(false)
                
            })
        })
        scrollToBottom();

    }, []);

    useEffect(() => {
        fetch(api('messages/lastMessage/'+props.user.id+'/'+props.admin.id), {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        }).then((res) => {
            res.json().then((res) => {
                const messageDate = new Date(res.send_time);
                const today = new Date();
                const differenceS = Math.abs(today - messageDate)/1000;
                if (differenceS > 86400) {
                    setAutoReply(true);
                } else {
                    setAutoReply(false)
                } 
                
            })
        })
        scrollToBottom();
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if(yourMessage.trim() === '') {
            return false;
        }

        if (msgCardBodyRef.current) {
            msgCardBodyRef.current.scrollTop = msgCardBodyRef.current.scrollHeight;
          }

        const msg = {
            sender_id: props.user.id,
            receiver_id: props.admin.id,
            message: yourMessage,
            send_time: new Date()
        };
        socket.emit('CLIENT_MSG', msg)

        setMessages(messages.concat([msg]))

        setYourMessage('');

        let promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    // Reponse auto
                    {
                        sender_id: props.admin.id,
                        receiver_id: props.user.id,
                        message: messageAuto,
                        send_time: new Date()
                    }
                )
    
            }, 1000)
        })

        const msgAuto = await promise;
        autoReply && socket.emit('CLIENT_MSG', msgAuto);
        
        // console.log('aaaaaaaaaaaaah', msgAuto);
        autoReply && setMessages(messages.concat([msg, msgAuto]))
        
    };

    return (
        <>
            <section className="sec-product-detail bg0 p-t-65">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-4" style={{height: "75vh"}}>
                            <div className="card mb-sm-3 mb-md-0 contacts_card">
                                {/* <div className="card-header"> */}
                                    {/* <div className="input-group">
                                        <input type="text" placeholder="Search..." name="" className="form-control search" />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                                        </div>
                                    </div> */}
                                {/* </div> */}
                                {/* <div className="contact-container"> */}
                                    <div className="card-body contacts_body">
                                        {/* <ui className="contacts">
                                            {props.users.map(u => {
                                                return (
                                                    <li className={props.admin.id == u.id ? "active" : "notActive"} key={u.id} style={{cursor: "pointer"}} onClick={e => setActive(e, u)}>
                                                    <div className="d-flex bd-highlight">
                                                        <div className="img_cont">
                                                            <img src={"photo/"+u.photoDeProfil} className="rounded-circle user_img" />
                                                            <span className="online_icon"></span>
                                                        </div>
                                                        <div className="user_info">
                                                            <span>{u.pseudo}</span>
                                                            <p>{u.pseudo} is online</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                )
                                                
                                            })}
                                        </ui> */}
                                        <div className="row">
                                            <div className="col-md-12 mb-5 flex-w w-full">
                                                {/* <span className="fs-18 cl5 txt-center size-211">
                                                    <span className="lnr lnr-phone-handset"></span>
                                                </span> */}

                                                <div className="p-t-2 w-100 txt-center">
                                                    <span className="mtext-110 cl2">
                                                        <span className="lnr lnr-phone-handset mr-2"></span>Contact
                                                    </span>
                                                    <p className="stext-115 cl1 p-t-18">
                                                        +261 34 12 345 67
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-md-12 flex-w w-full">
                                            {/* <span className="fs-18 cl5 txt-center size-211">
                                                <span className="lnr lnr-envelope"></span>
                                            </span> */}

                                            <div className="w-100 txt-center p-t-2">
                                                <span className="mtext-110 cl2">
                                                    <span className="lnr lnr-envelope mr-2"></span>Adresse email
                                                </span>
                                                <p className="stext-115 cl1 p-t-18">
                                                    contact@mail.com
                                                </p>
                                            </div>
                                        </div> 
                                        </div>

                                    </div>
                                {/* </div> */}
                                {/* <div className="card-footer"></div> */}
                            </div>
                        </div>
                        <div className="col-md-8" style={{height: "75vh"}}>
                            <div className="card">
                                <div className="card-header msg_head">
                                    {/* <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                            <img src={"photo/"+props.admin.photoDeProfil} className="rounded-circle user_img" />
                                        </div>
                                        <div className="user_info">
                                            <span>Chat with {props.admin.pseudo}</span>
                                        </div>
                                    </div> */}
                                    <h3>Espace assistance</h3>
                                    
                                </div>
                                <div ref={msgCardBodyRef} className="card-body msg_card_body">

                                    {/* ----------------------------------------------------------------------------------- */}
                                    {messages.map((msg, index) => {
                                        // console.log(new Date(msg.send_time).getTime(), new Date().getTime());
                                        console.log(index);
                                        let messageDate = new Date(msg.send_time)
                                        let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
                                        
                                        if(msg.sender_id == props.user.id) {
                                            return (
                                                <div key={msg.id} className="d-flex justify-content-end mb-4" test={index}>
                                                    <div key={"msg"+msg.id} className="msg_cotainer_send">
                                                        {msg.message}
                                                        <span key={'time'+msg.id} className="msg_time_send" style={{whiteSpace: "nowrap"}}>{("0"+messageDate.getHours()).slice(-2)}:{("0"+messageDate.getMinutes()).slice(-2)}, {messageDate.toLocaleDateString('en-US') == new Date().toLocaleDateString('en-US') ? "Aujourd'hui" : messageDate.getDay()+' '+months[messageDate.getMonth()]}</span>
                                                    </div>
                                                    <div key={"img"+msg.id} className="img_cont_msg">
                                                        <img src={"photo/"+props.user.photoDeProfil} className="rounded-circle user_img_msg"/>
                                                    </div>
                                                </div>
                                            )
                                        } else return (
                                            <div key={msg.id} className="d-flex justify-content-start mb-4">
                                                <div key={"img"+msg.id} className="img_cont_msg">
                                                    <img src={"photo/"+props.admin.photoDeProfil} className="rounded-circle user_img_msg" />
                                                </div>
                                                <div key={"msg"+msg.id} className="msg_cotainer">
                                                    {msg.message}
                                                    <span key={'time'+msg.id} className="msg_time">{("0"+messageDate.getHours()).slice(-2)}:{("0"+messageDate.getMinutes()).slice(-2)}, {messageDate.toLocaleDateString('en-US') == new Date().toLocaleDateString('en-US') ? "Aujourd'hui" : messageDate.getDay()+' '+months[messageDate.getMonth()]}</span>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div ref={messagesEndRef} />

                                </div>
                                    <div className="card-footer">
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                            </div>
                                            <textarea id="messageInput" value={yourMessage} onChange={(e) => { setYourMessage(e.target.value) }} name="" className="form-control type_msg" placeholder="Entrez votre message"></textarea>
                                            <div onClick={(e) => handleSendMessage(e)} tabIndex="0" className="input-group-append">
                                                <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                            </div>
                                        </div>                                       
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* <button className='btn btn-primary' onClick={getUsers}>Test</button> */}
        </>
    );
}
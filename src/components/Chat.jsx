import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import api from '../const/api';

export default function Chat(props) {

    const [userChatActive, setUserChatActive] = useState(props.users[0])
    const [messages, setMessages] = useState([])
    const [yourMessage, setYourMessage] = useState()
    const [checkAbo,setCheckAbo]=useState(props.checkAbo)
    const abonnement=useState(JSON.parse(props.abonnement))
    //console.log(abonnement)
   // const [nbMsg,setNbMsg]=useState(props.nbMsg)
    //const limitMsg=props.limitMsg


    const msgCardBodyRef = useRef(null)

    // const socket = io('localhost:3100'); 

    const getChatActiveMessage = (userActive) => {
        fetch(api('messages'), {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({'mon_id': props.user.id, 'receiver_id': userActive})
        }).then((res) => {
            res.json().then((res) => {
                // console.log(res);
                setMessages(res);
            })
        })
    }
    
    const setActive = (e, user) => {
        e.preventDefault();

        localStorage.setItem("activatedChat", user.id);
        setUserChatActive(user);

        getChatActiveMessage(user.id)
        // console.log('skrrrrrrrrrrrt', userChatActive.id);
    }

    const socket = io('localhost:3100');

    useEffect(() => {
        //getChatActiveMessage(userChatActive.id)

        // socket.connect();

        socket.on('SERVER_MSG', msg => {
            //setNbMsg(nbMsg+1)
            //console.log(nbMsg)
            /*if(nbMsg>=limitMsg){
                setCheckAbo(false)
                console.log(checkAbo)
            }*/
            if(msg.erreur && msg.sender_id==props.user.id){
                setCheckAbo(false)
            }else if(msg.limite && msg.sender_id==props.user.id){
                setCheckAbo(false)
                getChatActiveMessage(msg.receiver_id)
                //setMessages([...messages, msg]);
            }else{
                //setMessages([...messages, msg]);
                getChatActiveMessage(msg.receiver_id)
            }
        });
        // return () => {
        //     socket.disconnect();
        // }
    }, []);

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
            receiver_id: userChatActive.id,
            message: yourMessage,
            date_debut: abonnement[0].date_debut
        };
        socket.emit('CLIENT_MSG', msg);
        
        // setMessages([...messages, msg])
        messages.push(msg)        


        setYourMessage('');
        
    };

    return (
        <>
            <section className="sec-product-detail bg0 p-t-65">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-4" style={{height: "75vh"}}>
                            <div className="card mb-sm-3 mb-md-0 contacts_card">
                                <div className="card-header">
                                    <div className="input-group">
                                        <input type="text" placeholder="Search..." name="" className="form-control search" />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body contacts_body">
                                    <ui className="contacts">
                                        {props.users.map(u => {
                                            return (
                                                <li className={userChatActive.id == u.id ? "active" : "notActive"} key={u.id} style={{cursor: "pointer"}} onClick={e => setActive(e, u)}>
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
                                    </ui>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                        <div className="col-md-8" style={{height: "75vh"}}>
                            <div className="card">
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                            <img src={"photo/"+userChatActive.photoDeProfil} className="rounded-circle user_img" />
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            <span>Chat with {userChatActive.pseudo}</span>
                                            {/* <p>1767 Messages</p> */}
                                        </div>
                                        <div className="video_cam">
                                            <span><i className="fas fa-video"></i></span>
                                            <span><i className="fas fa-phone"></i></span>
                                        </div>
                                    </div>
                                    <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                                    <div className="action_menu">
                                        <ul>
                                            <li><i className="fas fa-user-circle"></i> View profile</li>
                                            <li><i className="fas fa-users"></i> Add to close friends</li>
                                            <li><i className="fas fa-plus"></i> Add to group</li>
                                            <li><i className="fas fa-ban"></i> Block</li>
                                        </ul>
                                    </div>
                                </div>
                                <div ref={msgCardBodyRef} className="card-body msg_card_body">

                                    {/* ----------------------------------------------------------------------------------- */}

                                    {messages.map(msg => {
                                        // console.log(new Date(msg.send_time).getTime(), new Date().getTime());
                                        let messageDate = new Date(msg.send_time)
                                        let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
                                        
                                        if(msg.sender_id == props.user.id) {
                                            return (
                                                <div key={msg.id} className="d-flex justify-content-end mb-4">
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
                                                    <img src={"photo/"+userChatActive.photoDeProfil} className="rounded-circle user_img_msg" />
                                                </div>
                                                <div key={"msg"+msg.id} className="msg_cotainer">
                                                    {msg.message}
                                                    <span key={'time'+msg.id} className="msg_time">{("0"+messageDate.getHours()).slice(-2)}:{("0"+messageDate.getMinutes()).slice(-2)}, {messageDate.toLocaleDateString('en-US') == new Date().toLocaleDateString('en-US') ? "Aujourd'hui" : messageDate.getDay()+' '+months[messageDate.getMonth()]}</span>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* ----------------------------------------------------------------------------------- */}
                                    
                                    {/* <div className="d-flex justify-content-start mb-4">
                                        <div className="img_cont_msg">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                        </div>
                                        <div className="msg_cotainer">
                                            I am good too, thank you for your chat template
                                            <span className="msg_time">9:00 AM, Today</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mb-4">
                                        <div className="msg_cotainer_send">
                                            You are welcome
                                            <span className="msg_time_send">9:05 AM, Today</span>
                                        </div>
                                        <div className="img_cont_msg">
                                            <img src="#" className="rounded-circle user_img_msg" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start mb-4">
                                        <div className="img_cont_msg">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                        </div>
                                        <div className="msg_cotainer">
                                            I am looking for your next templates
                                            <span className="msg_time">9:07 AM, Today</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mb-4">
                                        <div className="msg_cotainer_send">
                                            Ok, thank you have a good day
                                            <span className="msg_time_send">9:10 AM, Today</span>
                                        </div>
                                        <div className="img_cont_msg">
                                            <img src="" className="rounded-circle user_img_msg" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start mb-4">
                                        <div className="img_cont_msg">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                        </div>
                                        <div className="msg_cotainer">
                                            Bye, see you
                                            <span className="msg_time">9:12 AM, Today</span>
                                        </div>
                                    </div> */}
                                </div>
                                    <div className="card-footer">
                                        {checkAbo || props.user.estAdmin ?(
                                            <div className="input-group">
                                                <div className="input-group-append">
                                                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                                </div>
                                                <textarea id="messageInput" value={yourMessage} onChange={(e) => { setYourMessage(e.target.value) }} name="" className="form-control type_msg" placeholder="Entrez votre message"></textarea>
                                                <div onClick={(e) => handleSendMessage(e)} tabIndex="0" className="input-group-append">
                                                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                                </div>
                                            </div>
                                        ):(
                                            <div>
                                            Veuillez revoir votre abonnement si vous voulez envoyer de nouveau un message.
                                            <a href='/abonnement' >S'abonner</a>
                                            </div>
                                        )}                                        
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
import { useState, useEffect, useRef,React } from 'react';
import api from '../const/api';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Chat(props) {
    //console.log(props.chatActive)
    
    const [userChatActive, setUserChatActive] = useState(props.chatActive)  //useState(JSON.parse(localStorage.getItem('userChatActive')))
    var userChatActive1=props.chatActive
    const [user, setUser] = useState();

    const [messages, setMessages] = useState([])
    const [yourMessage, setYourMessage] = useState()
    const [checkAbo,setCheckAbo]=useState(parseInt(localStorage.getItem('checkAbo')))
    //console.log(checkAbo)
    const [nbMsg,setNbMsg]=useState(localStorage.getItem('nbMsg'))
    var nbMsg1=parseInt(localStorage.getItem('nbMsg'))
    const [showPicker,setShowPicker]=useState(false)
    
    const abonnement=(JSON.parse(localStorage.getItem('abonnement')))

    const limitMsg=5

    const messagesEndRef = useRef(null)
    const msgCardBodyRef = useRef(null)

    const [socket, setSocket] = useState();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))[0];
        const sock = new WebSocket("ws://capria-date-ws.onrender.com:5001");

        const user_info = {
			key: 'user_info',
			data: user
		};
        sock.onopen = function (event) {
            sock.send(JSON.stringify(user_info));
        }

        setSocket(sock);
    }, []);

    if(socket) {
        socket.onmessage = function (event) {
            const msg = JSON.parse(event.data);
            const newMsg = {
                sender_id: msg.sender_id,
                receiver_id: msg.receiver_id,
                message: msg.message,
                send_time: new Date(),
            };
            setMessages(messages.concat([newMsg]));
            console.log('tongasoa ny hafatra : ', event.data);
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const getChatActiveMessage = (userActive) => {
        
        fetch(api('messages'), {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({'mon_id': props.user.id, 'receiver_id': userActive})
        }).then((res) => {
            res.json().then((res) => {
                setMessages(res);
            })
        })
    }
    
    const setActive = (e, user) => {
        e.preventDefault();
        //localStorage.setItem("activatedChat", user.id);
        localStorage.setItem("userChatActive", JSON.stringify(user));
        setUserChatActive(user);
        userChatActive1=user
        //console.log('active='+user.id)
        getChatActiveMessage(user.id)
    }    
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user"))[0])
            if(userChatActive.id){
                getChatActiveMessage(userChatActive.id)
            }
    },[props.chatActive]);


    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const addEmoji = async(e)  => {
        //let emoji = e.native;
        //(e)
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        //console.log(codesArray)
        let emoji = String.fromCodePoint(...codesArray)
        setYourMessage(yourMessage+emoji)
        /*this.setState({
            text: this.state.text + emoji
        });*/
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(yourMessage.trim() === '') {
            return false;
        }
        //console.log(abonnement)
        setYourMessage('');

        if (msgCardBodyRef.current) {
            msgCardBodyRef.current.scrollTop = msgCardBodyRef.current.scrollHeight;
        }
        //console.log('abonnement[0]')
        //console.log(abonnement)
        const messageContent = {
            sender_id: props.user.id,
            receiver_id: userChatActive.id,
            //receiver_id: userChatActive1.id,
            message: yourMessage,
            send_time: new Date(),
            date_debut: abonnement.date_debut
        };

        const msg = {
            key: `user_message`,
            data: messageContent
        }
        // socket.emit('CLIENT_MSG', msg);
        socket.send(JSON.stringify(msg));
        
        setMessages(messages.concat([messageContent]))
        
    };

    const handleEnterKey = async (e) => {
        if(e.keyCode === 13 && !e.shiftKey) { 
            e.preventDefault();
            handleSendMessage(e)
            return false;
        }
    }

    const showPick = ()=>{
        /*if(showPicker) setShowPicker(false)
        else setShowPicker(true)*/
        $('.modal-emoji-header').addClass('show-modal-emoji');
        $(this).css('opacity','0');
    }

    const hidePick = ()=>{
        /*if(showPicker) setShowPicker(false)
        else setShowPicker(true)*/
        //console.log($('.modal-emoji-header'))
        $('.modal-emoji-header').removeClass('show-modal-emoji');
        $('.js-show-emoji').css('opacity','1');
    }

    const traduction = (message)=>{
        var splits=message.split(/\\u/g) 
        //console.log(splits)
        for(let i=0;i<splits.length;i++){
            if(splits[i].match(/[0-9a-f]/gi)){
                //splits[i]=String.fromCodePoint(splits[i])
                try {
                    splits[i]=String.fromCodePoint(splits[i]);             
                } catch (e) {             
                    //console.log("'Argument is not a valid code point'" +
                        //" error has occurred");
                }
            }
        }
        const newVal=splits.join('')
        //console.log(newVal)
        return newVal//message.replace('\\u', '&#');
        //return message.replace('\\u', '&#');               
    }

    //const styleEmoji="width:200px;height:100vh;z-index: 9000;overflow: auto;-webkit-transition: all 0.4s;-o-transition: all 0.4s;-moz-transition: all 0.4s;transition: all 0.4s;visibility: hidden;opacity: 0;"

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
                                                /*<li className={userChatActive.id == u.id ? "active" : "notActive"} key={u.id} style={{cursor: "pointer"}} onClick={e => setActive(e, u)}>*/
                                                <li className={userChatActive.id == u.id ? "active" : "notActive"} key={u.id} style={{cursor: "pointer"}} onClick={e => setActive(e, u)}>
                                                <div className="d-flex bd-highlight">
                                                    <div className="img_cont">
                                                        <img src={u.photoDeProfil} className="rounded-circle user_img" />
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
                                            {/*<img src={userChatActive.photoDeProfil} className="rounded-circle user_img" />*/}
                                            <img src={userChatActive.photoDeProfil} className="rounded-circle user_img" />
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            {/*<span>{userChatActive.pseudo}</span>*/}
                                            <span>{userChatActive.pseudo}</span>
                                            {/* <p>1767 Messages</p> */}
                                        </div>
                                        {/* <div className="video_cam">
                                            <span><i className="fas fa-video"></i></span>
                                            <span><i className="fas fa-phone"></i></span>
                                        </div> */}
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

                                    {messages.map((msg) => {
                                        let messageDate = new Date(msg.send_time)
                                        let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
                                        
                                        if(msg.sender_id == props.user.id) {
                                            return (
                                                <div key={msg.id} className="d-flex justify-content-end mb-4">
                                                    <div key={"msg"+msg.id} className="msg_cotainer_send">
                                                        {traduction(msg.message)}
                                                        <span key={'time'+msg.id} className="msg_time_send" style={{whiteSpace: "nowrap"}}>{("0"+messageDate.getHours()).slice(-2)}:{("0"+messageDate.getMinutes()).slice(-2)}, {messageDate.toLocaleDateString('en-US') == new Date().toLocaleDateString('en-US') ? "Aujourd'hui" : messageDate.getDay()+' '+months[messageDate.getMonth()]}</span>
                                                    </div>
                                                    <div key={"img"+msg.id} className="img_cont_msg">
                                                        <img src={props.user.photoDeProfil} className="rounded-circle user_img_msg"/>
                                                    </div>
                                                </div>
                                            )
                                        } else return (
                                            <div key={msg.id} className="d-flex justify-content-start mb-4">
                                                <div key={"img"+msg.id} className="img_cont_msg">
                                                    {/*<img src={userChatActive.photoDeProfil} className="rounded-circle user_img_msg" />*/}
                                                    <img src={userChatActive.photoDeProfil} className="rounded-circle user_img_msg" />
                                                </div>
                                                <div key={"msg"+msg.id} className="msg_cotainer">
                                                    {traduction(msg.message)}
                                                    <span key={'time'+msg.id} className="msg_time">{("0"+messageDate.getHours()).slice(-2)}:{("0"+messageDate.getMinutes()).slice(-2)}, {messageDate.toLocaleDateString('en-US') == new Date().toLocaleDateString('en-US') ? "Aujourd'hui" : messageDate.getDay()+' '+months[messageDate.getMonth()]}</span>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div ref={messagesEndRef} />
                                </div>
                                <div className="card-footer">
                                    {checkAbo==0 || props.user.estAdmin ?(
                                        <div className="input-group">
                                            <div className="input-group-append">
                                                <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                            </div>
                                            <textarea id="messageInput" value={yourMessage} onKeyDown={(e) => handleEnterKey(e)} onChange={(e) => { setYourMessage(e.target.value) }} name="" className="form-control type_msg" placeholder="Entrez votre message"></textarea>
                                                                                        
                                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-emoji" onClick={(e)=>{showPick()}} >
                                                <span>{String.fromCodePoint(0x1f600)}</span>
                                            </div>
                                            
                                            <div onClick={(e) => handleSendMessage(e)} tabIndex="0" className="input-group-append">
                                                <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                            </div>
                                        </div>
                                    ):(
                                        <div className='text-center'>
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

            
            <div className="modal-emoji-header flex-c-m trans-04 js-hide-emoji">
                <div className="container-emoji-header">
                    <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-emoji" onClick={(e)=>{hidePick()}}>
                        <img src="/images/icons/icon-close2.png" alt="CLOSE"/>
                    </button>

                    <Picker data={data} onEmojiSelect={(e)=>{addEmoji(e)}} />
                </div>
            </div>
        </>
    );
}
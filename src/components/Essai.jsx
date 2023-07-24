import io from 'socket.io-client';
//import 'css/App.css';
import {useState} from 'react'
import api from "../const/api";

function Essai(userInfo) {
  const [messages, setMessages] = useState(userInfo.messagesAvant); 

  const socket = io('localhost:3100');
  //console.log(userInfo.messagesAvant)
  const user=JSON.parse(userInfo.userInfo)

  socket.on('SERVER_MSG', msg => {
    setNewMessage(msg);
  });

  function setNewMessage(msg) {
    setMessages([
      ...messages,
      msg
    ]);
    //messages.push(msg)
  }

  function sendMessage(e) {
    e.preventDefault();
    console.log('active='+localStorage.getItem("activatedChat"))
    var receiver=localStorage.getItem("activatedChat")
    const msg = {
        sender_id: user[0].id,
        receiver_id: receiver,
        message: e.target.text.value
    };
    socket.emit('CLIENT_MSG', msg);
    setNewMessage(msg);
  }

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">My first chat</div>
              <hr/>
              <div className="messages">
                {messages.map(msg => {
                  return (
                      <div key={messages.indexOf(msg)}>{msg.sender_id}: {msg.message}</div>
                  )
                })}
              </div>
            </div>
            <form onSubmit={e => sendMessage(e)}>
              <div className="card-footer">
                <input id="username"
                       type="text"
                       placeholder="Username"
                       className="form-control"
                />
                <br/>
                <input id="text"
                       type="text"
                       placeholder="Your message"
                       className="form-control"
                />
                <br/>
                <button type="submit"
                        className="btn btn-primary form-control">
                  send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Essai;

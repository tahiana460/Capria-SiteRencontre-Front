import io from 'socket.io-client';
//import 'css/App.css';
import {useState} from 'react'
import api from "../const/api";

function Essai(userInfo) {
  var [messages, setMessages] = useState([]);  

  const socket = io('localhost:3100');
  //console.log(socket)
  const user=JSON.parse(userInfo.userInfo)

  var rec_id=localStorage.getItem("activatedChat")
  if(rec_id==null){
    
  }
  var obj={'mon_id':user.id,'receiver_id':rec_id}
  //console.log(obj)
  const jsonString = JSON.stringify(obj);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

    //console.log(jsonString);
      const response = await fetch("http://localhost:3100/chat", {
      headers: myHeaders,
      method:'POST',
      body:jsonString
    });
    //console.log(await response.text());
    const reponse = await response.json();
    //console.log(reponse)
    messages=reponse

  socket.on('SERVER_MSG', msg => {
    setNewMessage(msg);
  });

  function setNewMessage(msg) {
    setMessages([
      ...messages,
      msg
    ]);
  }

  function sendMessage(e) {
    e.preventDefault();
    console.log('active='+localStorage.getItem("activatedChat"))
    var receiver=localStorage.getItem("activatedChat")
    const msg = {
        username: user[0].id,
        receiverId: receiver,
        text: e.target.text.value
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
                      <div key={messages.indexOf(msg)}>{msg.username}: {msg.text}</div>
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

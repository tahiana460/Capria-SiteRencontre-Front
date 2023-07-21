import io from 'socket.io-client';
//import 'css/App.css';
import {useState} from 'react'

function Essai(userInfo) {
  const [messages, setMessages] = useState([]);
  const socket = io('localhost:3100');

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
    //console.log(userInfo.userInfo)
    var user=JSON.parse(userInfo.userInfo)
    console.log(user)
    e.preventDefault();
    const msg = {
        username: user[0].id,
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

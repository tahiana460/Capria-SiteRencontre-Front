import React, { useState, useEffect } from 'react';
import api from '../const/api';


export default function Icon_header() {

    const [notiications, setNotifications] = useState([]);

	const [disconnect, setDisconnect] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))[0];
		console.log(user);
		var sock = new WebSocket("wss://capria-date-ws.onrender.com:5001");

		const user_info = {
			key: 'user_info',
			data: user
		};


		sock.onopen = function (event) {
			sock.send(JSON.stringify(user_info));
		}
		sock.onmessage = function (event) {
			console.log('New message : ', event.data);
		}
	}, []);
    
    // useEffect(() => {
    //     socket.on('connect', () => {
    //         // socket.on('getNotification', data => {
    //         //     // setNotifications((prev) => [...prev, data])
    //         //     console.log('Indreto izahay ', data);
    //         // })
    //         socket.on('getNotification', data => {
    //             console.log('Some notifications ', data);
    //         })
    //     })
    // }, [])

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))[0];
		if(disconnect) {
			localStorage.removeItem("user");
			localStorage.removeItem("abonnement");
			// socket.on('connect', function() {
			// socket.emit("client_disconnect", user.id);
			// })
			window.location.href = '/login'
		}
	}, [disconnect])

    return (
        <>
            <div className="wrap-icon-header flex-w flex-r-m">
						{/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="2"> */}
						<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10">
							<a href="/chat"><i className="fa-sharp fa-regular fa-message text-dark hov-cl1"></i></a>
						</div>

						{/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2"> */}
						<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 js-show-cart">
							<i className="fa-sharp fa-regular fa-bell"></i>
						</div>

						{/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
							<i className="fa-sharp fa-solid fa-magnifying-glass"></i>
						</div> */}

						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 " data-notify="2">
							<i className="fa-sharp fa-solid fa-right-from-bracket text-dark" onClick={() => {setDisconnect(true)}} ></i>
							{/* <a href="/login?deconnexion=1" ><i className="fa-sharp fa-solid fa-right-from-bracket text-dark"></i></a> */}
						</div>
						{/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="2">
							<i className="zmdi zmdi-shopping-cart"></i>
						</div>

						<a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="0">
							<i className="zmdi zmdi-favorite-outline"></i>
						</a> */}
					</div>
        </>
    );
}
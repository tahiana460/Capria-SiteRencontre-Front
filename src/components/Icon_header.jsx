import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Icon_header() {
    const [notiications, setNotifications] = useState([]);

    const socket = io('localhost:3100');
    
    useEffect(() => {
        socket.on('connect', () => {
            // socket.on('getNotification', data => {
            //     // setNotifications((prev) => [...prev, data])
            //     console.log('Indreto izahay ', data);
            // })
            socket.on('getNotification', data => {
                console.log('Some notifications ', data);
            })
        })
    }, [])

    return (
        <>
            <div className="wrap-icon-header flex-w flex-r-m">
						<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="2">
							<a href="/chat"><i className="fa-sharp fa-regular fa-message text-dark hov-cl1"></i></a>
						</div>

						<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
							<i className="fa-sharp fa-regular fa-bell"></i>
						</div>

						{/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
							<i className="fa-sharp fa-solid fa-magnifying-glass"></i>
						</div> */}

						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 " data-notify="2">
							<a href="/login?deconnexion=1" ><i className="fa-sharp fa-solid fa-right-from-bracket text-dark"></i></a>
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
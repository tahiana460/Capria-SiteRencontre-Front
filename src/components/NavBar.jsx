import React, { useEffect, useState } from "react";
import IconHeader from "./Icon_header";
import io from 'socket.io-client';
import api from '../const/api';

export default function NavBar() {
	const [currentPage, setCurrentPage] = useState();
	const [user, setUser] = useState();

	const socket = io(api(''));

	const [disconnect, setDisconnect] = useState(false);

	useEffect(() => {
		setCurrentPage(window.location.pathname);
		setUser((JSON.parse(localStorage.getItem("user")))[0]);
	}, [])

	useEffect(() => {
		if(disconnect) {
			localStorage.removeItem("user");
			localStorage.removeItem("abonnement");
			// socket.on('connect', function() {
				socket.emit("client_disconnect", user.id);
			// })
			window.location.href = '/login'
		}
	}, [disconnect])


	return (
		<>
			<header className="header-v4">
				{/* Header desktop */}
				<div className="container-menu-desktop">

					<div className="wrap-menu-desktop how-shadow1" style={{"top": 0}}>
						<nav className="limiter-menu-desktop container">
							
							{/* <!-- Logo desktop -->	 */}
							<a href="/accueil" className="logo">
								<img src="images/icons/logo-01.png" alt="IMG-LOGO" />
							</a>

							{/* <!-- Menu desktop --> */}
							<div className="menu-desktop">
								<ul className="main-menu">
									<li className={currentPage == "/accueil" ? "active-menu" : "menu"}>
										<a href="/accueil">Accueil</a>
										{/* <!-- <ul className="sub-menu">
											<li><a href="index.html">Homepage 1</a></li>
											<li><a href="home-02.html">Homepage 2</a></li>
											<li><a href="home-03.html">Homepage 3</a></li>
										</ul> --> */}
									</li>

									<li className={currentPage == "/abonnement" ? "active-menu" : "menu"}>
										<a href="/abonnement">Abonnement</a>
									</li>

									{/* <!-- <li className={currentPage == "/chat" ? "active-menu" : "menu"}>
										<a href="/chat">Chat</a>
									</li> --> */}

									{/* <!-- <li className="label1" data-label1="hot">
										<a href="shoping-cart.html">Features</a>
									</li> --> */}

									<li className={currentPage == "/profile" ? "active-menu" : "menu"}>
										<a href={"/profile?id="+user?.id}>Profil</a>
									</li>

									<li className={currentPage == "/assistance" ? "active-menu" : "menu"}>
										<a href="/assistance">Assistance</a>
									</li>

									{/* <!-- <li>
										<a href="about.html">{user.id}</a>
									</li> --> */}

									{/* <!-- <li>
										<a href="contact.html">Contact</a>
									</li> --> */}
								</ul>
							</div>	

							{/* <!-- Icon header --> */}
							<IconHeader />
						</nav>
					</div>	
				</div>

				{/* <!-- Header Mobile --> */}
				<div className="wrap-header-mobile">
					{/* <!-- Logo moblie -->	 */}
					<div className="logo-mobile">
						<a href="/accueil"><img src="images/icons/logo-01.png" alt="IMG-LOGO" /></a>
					</div>

					{/* <!-- Icon header --> */}
					<div className="wrap-icon-header flex-w flex-r-m m-r-15">				

						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
							<i className="zmdi zmdi-search"></i>
						</div>

						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 " data-notify="2">
							<i className="zmdi zmdi-power" onClick={() => {setDisconnect(true)}}></i>
							{/* <a href="/login?deconnexion=1" ><i className="zmdi zmdi-power"></i></a> */}
						</div>
					</div>

					{/* <!-- Button show menu --> */}
					<div className="btn-show-menu-mobile hamburger hamburger--squeeze">
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
					</div>
				</div>


				{/* <!-- Menu Mobile --> */}
				<div className="menu-mobile">

					<ul className="main-menu-m">

						<li>
							<a href="/accueil">Accueil</a>
						</li>

						<li>
							<a href="/abonnement">Abonnement</a>
						</li>

						<li>
							<a href="/chat">Chat</a>
						</li>

						<li>
							<a href={"/profile?id="+user?.id}>Profil</a>
						</li>

						<li>
							<a href="/assistance">Assistance</a>
						</li>
					</ul>
				</div>

				{/* <!-- Modal Search --> */}
				<div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
					<div className="container-search-header">
						<button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
							<img src="images/icons/icon-close2.png" alt="CLOSE" />
						</button>

						<form className="wrap-search-header flex-w p-l-15">
							<button className="flex-c-m trans-04">
								<i className="zmdi zmdi-search"></i>
							</button>
							<input className="plh3" type="text" name="search" placeholder="Search..." />
						</form>
					</div>
				</div>
			</header>
		</>
	);
}
	
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import api from '../const/api';
// import Cookies from 'js-cookie';
 
export default function Login(props) {
    // console.log(props.appFbId);
    const [data, setData] = useState()
    const [authGoogle, setAuthGoogle] = useState(false)

    useEffect(() => {
        // console.log(data);
        // alert(Cookies.get('socialData'));
        // Cookies.set('socialData', JSON.stringify(data))
        if(data) {
            // console.log(data);
            if(authGoogle) {
                fetch(api('users/google/'+data.email), {
                    headers: {"Content-Type": "application/json"},
                    method: "GET"
                }).then((res) => {
                    res.json().then((res) => {
                        if(res.length != 0) {

                            Cookies.set('userFromCookie', JSON.stringify(res[0]))
                            window.location.href = '/accueil?socialAuth=true';
                        } else {
                            swal({
                                title: "Ce compte Google n'est lié à aucun compte",
                                text: "Voulez-vous en créer un?",
                                icon: "error",
                                buttons: "S'inscrire"
                                // dangerMode: true,
                              })
                              .then((register) => {
                                if (register) {
                                    window.location.href = '/registration';
                                }
                              });
                        }
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else console.log('no data');
    }, [data])

    return (
        <>
            {/* <LoginSocialFacebook
                appId="307101788540433"
                onResolve={(res) => {
                    console.log(res);
                }}
                onReject={(error) => {
                    console.log(error)
                }}
            >
                <FacebookLoginButton align='center'/>
            </LoginSocialFacebook> */}

            {/* <LoginSocialGoogle
                client_id={ "220892165398-e8h0g8mpclnmfjpb3hitlrrgnfjidagm.apps.googleusercontent.com" }
                scope='openid profile email'
                discoveryDocs='claims_supported'
                access_type='offline'
                onResolve={(provider, data) => {
                    console.log(provider.data.email);
                }}
                onReject={(error) => {
                    console.log('Oups, ', error)
                }}
            >
                <GoogleLoginButton align='center' className='btn btn-primary btn-block mt-3'>
                    <span>Se connecter avec Google</span>
                </GoogleLoginButton>
            </LoginSocialGoogle> */}
            <div className="text-center">
                <p>ou continuer avec</p>
                <LoginSocialFacebook
                    appId={props.facebookAppId}
                    onResolve={(res) => {
                        console.log(res);
                    }}
                    onReject={(error) => {
                        console.log(error)
                    }}
                    className="btn"
                >
                    {/* <button type="button" className="btn btn-link btn-floating mx-1"> */}
                    {/* <button type="button" className="btn btn-floating mx-1 hov-btn1 trans-04" style={{borderRadius: "50%", width: "5vh", height: "4.7vh"}} > */}
                    <a className="flex-c-m how-pagination1 trans-04 m-all-7 hov-btn1" style={{border: "none", cursor: "pointer"}}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    {/* </button> */}
                </LoginSocialFacebook>
                <LoginSocialGoogle
                    client_id={ props.googleAppId }
                    scope='openid profile email'
                    discoveryDocs='claims_supported'
                    access_type='offline'
                    onResolve={(provider, data) => {
                        setAuthGoogle(true)
                        setData(provider.data)
                    }}
                    onReject={(error) => {
                        console.log(error)
                    }}

                    className="btn"
                >
                    {/* <button type="button" className="btn btn-link btn-floating mx-1"> */}
                    {/* <button type="button" className="btn btn-floating mx-1 hov-btn1 trans-04" style={{borderRadius: "50%", width: "5vh", height: "4.7vh"}} > */}
                        <a className="flex-c-m how-pagination1 trans-04 m-all-7 hov-btn1" style={{border: "none", cursor: "pointer"}}>
                            <i className="fab fa-google"></i>
                        </a>
                    {/* </button> */}
                </LoginSocialGoogle>

                {/* <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                </button> */}
            </div>
        </>
    );
}
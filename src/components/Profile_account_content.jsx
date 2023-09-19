import { useState } from "react"
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import api from "../const/api"

export default function Associated_account(props) {
    const [user, setUser] = useState(props.user)
    const [googleAccount, setGoogleAccount] = useState(user.google)
    const [googleError, setGoogleError] = useState(true)
    const [googleHovered, setGoogleHovered] = useState(false)
    
    const associateGoogle = email => {
        fetch(api('users/google/'+email), {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        }).then((res) => {
            res.json().then((res) => {
                if(res.length == 0) {
                    fetch(api('users/google/associate/'+user.id), {
                        headers: {"Content-Type": "application/json"},
                        method: "PUT",
                        body: JSON.stringify({"email" : email})
                    })
                    setGoogleAccount(email)
                    // swal('Compte Google associé', '', 'success');
                    swal("Compte Google ajouté", {
                        icon: "success",
                        button:false,
                        timer: 2000
                    });
                } else swal('Erreur', 'Ce compte Google est déjà lié à un autre compte', 'error');
            })
        })
    }

    const deleteGoogle = () => {
        swal({
            title: "Êtes-vous sûr?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: ["Annuler", "Supprimer"]
            // dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(api('users/google/dissociate/'+user.id), {
                    headers: {"Content-Type": "application/json"},
                    method: "PUT"
                }).then(() => {
                    setGoogleAccount(null)
                    swal("Compte dissocié", {
                        icon: "success",
                        button:false,
                        timer: 2000
                    });
                })
            }
          });
    }

    return (
        <table className="w-75">
            <tbody>
                <tr>
                    <td className="pb-2 w-50"><span className="stext-102 cl3 size-206">Adresse email</span></td>
                    <td className="text-left"><span className="stext-102 cl6 size-206">{user.mail}</span></td>
                </tr>
                <tr>
                    <td className="pb-2"><span className="stext-102 cl3 size-206">Mot de passe</span></td>
                    <td className="text-left"><span className="stext-102 cl6 size-206"><a href="" onClick={() => {return false}} data-toggle="modal" data-target="#updatePasswordModal" >Changer mon mot de passe</a></span></td>
                </tr>
                <tr></tr>
                <tr>
                    <td className="pb-2 w-50"><p className="stext-102 cl6 mt-3">Compte associé</p></td>
                    <td className="text-left"></td>
                </tr>
                <tr>
                    <td className="pb-2 w-50"><i className="fab fa-google mr-2"></i><span className="stext-102 cl3 size-206">Google</span></td>
                    <td className="text-left">
                        <span className="stext-102 cl6 size-206" onMouseEnter={()=> setGoogleHovered(true)} onMouseLeave={() => setGoogleHovered(false)}>
                            {googleAccount!=null ? googleAccount :
                            <LoginSocialGoogle
                                client_id={ props.googleAppId }
                                scope='openid profile email'
                                discoveryDocs='claims_supported'
                                access_type='offline'
                                onResolve={(provider, data) => {
                                    console.log('Ceci est un email', provider.data);
                                    // associateGoogle(provider.data.email);
                                }}
                                onReject={(error) => {
                                    console.log(error)
                                }}
                            >
                            <span className="stext-102 text-primary size-206" style={{cursor:"pointer"}}>Ajouter un compte</span>
                            </LoginSocialGoogle>}
                            {(googleAccount!=null && googleHovered) && <i className="fa-solid fa-circle-minus ml-2" style={{color: 'red', cursor: 'pointer'}} onClick={deleteGoogle} title="Dissocier"></i>}
                            </span>
                    </td>
                </tr>
                {/* <tr>
                    <td className="pb-2 w-50"><i className="fab fa-facebook-f mr-2"></i><span className="stext-102 cl3 size-206">Facebook</span></td>
                    <td className="text-left"><span className="stext-102 cl6 size-206"><a href="">Ajouter un compte</a></span></td>
                </tr> */}
            </tbody>
        </table>
    );
}
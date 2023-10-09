import React, {useState} from 'react'
import api from '../const/api'
import './login.css'

export default function Login() {

    const [email,setEmail]=useState('')
    const [mdp,setMdp]=useState('')
    const [erreur,setErreur]=useState(false)

    const log = async()=>{
        console.log(email)
        var res=String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/);
        //var txt='ertyr.00@oiur.fr';
        //console.log(String(txt).match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/));
        //console.log(res);
        if(res!=null){
            const jsonObject = {'mail':email,'mdp':mdp};
            const jsonString = JSON.stringify(jsonObject);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

            //console.log(jsonString);
            const response = await fetch(api("login"), {
                headers: myHeaders,
                method:'POST',
                body:jsonString
            });
            //console.log(await response.text());
            const reponse = await response.json();
            //console.log(reponse)
            if(reponse.erreur==undefined){
                //console.log('reponse non erreur');
                var rep=JSON.stringify(reponse)
                localStorage.setItem('user',rep)
                //console.log(reponse)
                const userAbo = await fetch(api("subscription/"+reponse[0].id), {
                    headers: myHeaders,
                    method:'GET'
                });
                //console.log(userAbo)
                const abo=await userAbo.json();
                //console.log(abo)
                if(abo.length==0){
                    localStorage.setItem("abonnement",'')
                }else{          
                    const ajd=new Date()
                    const dateFin=new Date(abo[0].date_fin)
                    if(dateFin>ajd){
                        localStorage.setItem("abonnement",JSON.stringify(abo[0]));
                    }else{
                        localStorage.setItem("abonnement",'')
                    }
                }

                window.location.href = '/accueil';
            }else{
                //erreur=reponse.erreur;
                setErreur(reponse.erreur);
            }
        }    else{
            //erreur="Mail invalide";
            setErreur("Mail invalide");
        }
    }

    return (
        
        <  >

            <div className="form-group">
                <input type="email" id="email" name="mail" className="form-control" placeholder=" " style={{"borderRadius": "0 !important"}} onChange={(e) => { setEmail(e.target.value) }} />
                <label className="form-label">Adresse email</label>
            </div>

            <div className="form-group mb-4">
                <input type="password" id="password" name="mdp" className="form-control" placeholder=" " style={{"borderRadius": "0 !important"}}onChange={(e) => { setMdp(e.target.value) }} />
                <label className="form-label" htmlFor="password">Mot de passe</label>
            </div>
             
            {erreur &&<div className="alert alert-danger" role="alert">
                {erreur}
            </div>}
            <div className="form-group mb-4">
                <a href='/forgot-password'>Mot de passe oublié.</a> 
            </div> 
            <button type="submit" className="flex-c-m stext-101 bg2 hov-btn1 size-116 p-lr-15 trans-04 mb-3" onClick={log} >
                Se Connecter
            </button>
        </>
    
    );
}
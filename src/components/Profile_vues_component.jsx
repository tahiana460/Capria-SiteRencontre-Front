import './css/profile_vues.css'

export default function Profile_vues_component(props){
    const  vues  = props.vues;
    const abonnement=localStorage.getItem("abonnement")
    //console.log(abonnement)
    var vuePersonne=true
    if(abonnement==''){
        vuePersonne=false
    }

    return(
        <div className="tab-pane fade" id="vues" role="tabpanel">
            <div className="p-lr-15-md" style={{"padding-left":"30%"}}>                
                {vuePersonne&&
                <table className="w-75">
                {vues.map((profil)=>(
                    //console.log(profil.pseudo);
                    <tr>
                        <td className="pb-2 w-50">
                            <img id="imgVue" src={profil.photoDeProfil} alt="IMG-PRODUCT"/>
                        </td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{profil.pseudo}</span></td>
                    </tr>
                ))}            
                    
                </table>}
                {vuePersonne==false&&
                <><p>Veuillez revoir votre abonnement si vous voulez savoir qui a visité votre profil</p><br/>
                <form action="/abonnement" >
                    <div className="row">
                        <div className="col-sm-3" ></div>
                        <button className="flex-c-m stext-101 cl0 size-112 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                            S'abonner
                        </button>
                    </div>
                </form>
                </>
                }
            </div>
        </div>
    )
}
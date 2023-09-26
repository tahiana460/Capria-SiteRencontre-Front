import '../../public/css/profile_about.css'

export default function Profile_about_component(props){
    
    const user=props.user
    //console.log(user)
    const moi=props.moi
    const diffDays = Math.ceil(Math.abs(new Date() - new Date(user.dateDeNaissance)) / (1000 * 60 * 60 * 24));
    const age = parseInt(diffDays/365);
    const orientationSxl=props.orientation

    return (
        <>
        <div className="tab-pane fade show active" id="about" role="tabpanel">
            <div className="p-content p-lr-15-md">
                <table className="w-75">
                    <tr>
                        <td className="pb-2 w-50"><span className="stext-102 cl3 size-205">Nom</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{user.nom}</span></td>
                    </tr>
                    <tr>
                        <td className="pb-2"><span className="stext-102 cl3 size-205">Prénom</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{user.prenom}</span></td>
                    </tr>
                    <tr>
                        <td className="pb-2"><span className="stext-102 cl3 size-205">Sexe</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{user.sexe == 'H' && 'Homme' || 
                                                                                    user.sexe == 'F' && 'Femme' ||
                                                                                    user.sexe == 'A' && 'Autre'}</span></td>
                    </tr>
                    <tr>
                        <td className="pb-2"><span className="stext-102 cl3 size-205">Age</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{age} ans</span></td>
                    </tr>
                    <tr>
                        <td className="pb-2"><span className="stext-102 cl3 size-205">Ville</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{user.ville}</span></td>
                    </tr>
                    <tr>
                        <td className="pb-2"><span className="stext-102 cl3 size-205">Nationalité</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{user.nation}</span></td>
                    </tr>
                    <tr>
                        <td className="pb-2"><span className="stext-102 cl3 size-205">Orientation sexuel</span></td>
                        <td className="text-left"><span className="stext-102 cl6 size-206">{orientationSxl}</span></td>
                    </tr>
                </table>
            </div>
            {moi==1&&
            <div className="row mt-5">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <button type="button" className="flex-c-m stext-101 bg2 hov-btn1 size-116 p-lr-15 trans-04 mb-3" data-toggle="modal" data-target="#profileEditModal">Modifier mon profil</button>
                </div>
                <div className="col-md-4"></div>    
            </div>
        }
        </div>
        
        </>
    )
}
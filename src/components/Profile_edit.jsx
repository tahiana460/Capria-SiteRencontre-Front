import { useState } from "react"
import './Profile_edit.css'
import api from "../const/api"

export default function Profile_edit(props) {
    const [pseudo, setPseudo] = useState(props.user.pseudo);
    const [name, setName] = useState(props.user.nom);
    const [firstname, setFirstname] = useState(props.user.prenom);
    const [gender, setGender] = useState(props.user.sexe);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(props.user.dateDeNaissance).toISOString().split('T')[0]);
    const [city, setCity] = useState(props.user.ville);
    const [nationality, setNationality] = useState(props.user.nation);
    const [sexualOrientation, setSexualOrientation] = useState(props.user.orientationSxl);

    const [errorPseudo, setErrorPseudo] = useState(false)
    const [errorDateOfBirth, setErrorDateOfBirth] = useState(false)

    const checkError = e => {
        e.preventDefault();

        fetch(api('users/pseudo/'+pseudo), {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        }).then((res) => {
            res.json().then((res) => {
                // CHECK PSEUDO
                res.length != 0 && res[0].pseudo != props.user.pseudo ? setErrorPseudo(true) : setErrorPseudo(false);

                // CHECK DATE OF BIRTH
                const currentDate = new Date();
                const birthday = new Date(dateOfBirth);

                const diffDays = Math.ceil(Math.abs(currentDate - birthday) / (1000 * 60 * 60 * 24)); 

                const diffYears = parseInt(diffDays/365);
                // console.log(diffYears);

                diffYears < 18 ? setErrorDateOfBirth(true) : setErrorDateOfBirth(false)
            }).then(() => {
                if(!errorDateOfBirth && !errorPseudo) {
                    fetch(api('users/id/'+props.user.id), {
                        headers: {"Content-Type": "application/json"},
                        method: "PUT",
                        body: JSON.stringify({
                            "name": name,
                            "firstname": firstname,
                            "pseudo": pseudo,
                            "gender": gender,
                            "dateOfBirth": dateOfBirth,
                            "city": city,
                            "nationality": nationality,
                            "sexualOrientation": sexualOrientation
                        })
                    }).then((res) => {
                        if(res.ok) {
                            window.location.href = '/profile?id='+props.user.id;
                        } else {
                            throw Error("Error")
                        }
                    }).catch(() => {
                        console.log('Error');
                    })
                } else return false;
            })
        })
    }

    return (
        <>
            <div className="modal-content">
                {/* <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Mise à jour de mon profil</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> */}
                <div className="modal-body my-4" style={{marginInline: "10%"}}>
                    <h2 className="mb-5 text-center">Mise à jour du profil</h2>
                    <form onSubmit={checkError}>
                            <div className="tab">
                                <div className="form-group">
                                    <input type="text" id="pseudo" name="pseudo" className={errorPseudo ? "form-control in-error" : "form-control"} value={pseudo} onChange={(e) => { setPseudo(e.target.value) }} placeholder=" " required/>
                                    <label className="form-label">Pseudo</label>
                                    { errorPseudo && <span className='error'>Ce pseudo est déjà pris</span> }
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder=" " required/>
                                            <label className="form-label">Nom</label>
                                            {/* { errorEmail && <span className='error'>Cet email est déjà pris</span> } */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="firstname" name="firstname" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} placeholder=" " required/>
                                            <label className="form-label" htmlFor='firstname'>Prénom(s)</label>
                                            {/* { errorPassword && <span className='error'>Le mot de passe doit contenir au moins 6 caractères</span> } */}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="date" id="dateOfBirth" name="dateOfBirth" className={errorDateOfBirth ? "form-control in-error" : "form-control"} value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} placeholder=" " required/>
                                    <label className="form-label">Date de naissance</label>
                                    { errorDateOfBirth && <span className='error'>Date de naissance invalide</span> }
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            {/* <input type="text" id="gender" onChange={inputChange('gender')} value={values.gender} name="gender" className="form-control" placeholder=" " /> */}
                                            {/* <label className="form-label">Genre</label> */}
                                            <select name="gender" id="gender" className="form-control" value={gender} onChange={(e) => { setGender(e.target.value) }} required>
                                                <option value="">Genre</option>
                                                <option value="H">Homme</option>
                                                <option value="F">Femme</option>
                                                <option value="A">Autre</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            {/* <input type="text" id="sexual_orientation" onChange={inputChange('sexual_orientation')} value={values.sexual_orientation} name="sexual_orientation" className="form-control" placeholder=" " />
                                            <label className="form-label">Orientation sexuelle</label> */}
                                            <select name="sexualOrientation" style={{backgroundColor: "transparent"}} id="sexualOrientation" className="form-control" value={sexualOrientation} onChange={(e) => { setSexualOrientation(e.target.value) }} required>
                                                <option value="">Orientation sexuelle</option>
                                                <option value="Hetero">Hétérosexuel</option>
                                                <option value="Homo">Homosexuel</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" id="city" value={city} onChange={(e) => { setCity(e.target.value) }} name="city" className="form-control" placeholder=" " required/>
                                    <label className="form-label">Ville</label>
                                </div>
                                <div className="form-group">
                                    <input type="text" id="nationality" value={nationality} onChange={(e) => { setNationality(e.target.value) }} name="nationality" className="form-control" placeholder=" " required/>
                                    <label className="form-label">Nationalité</label>
                                </div>
                            </div>

                        {/* Submit button */}
                        <button type="submit" id="submit-btn" className="btn btn-primary btn-block btn-shadow mt-5">Enregistrer</button>
                        <button type="submit" id="submit-btn" data-dismiss="modal" className="btn btn-secondary btn-block btn-shadow" onClick={(e) => {e.preventDefault()}}>Annuler</button>
                    </form>
                    {/* <button className="btn btn-danger" onClick={() => {console.log('oay toa mety')}}>Nooooooooo</button> */}

                </div>
                {/* <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-primary">Confirmer</button>
                </div> */}
            </div>
        </>
    );

}
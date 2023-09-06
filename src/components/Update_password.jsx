import { useState } from "react"
// import './Profile_edit.css'
import api from "../const/api"
import sha1 from 'js-sha1'

export default function Update_password(props) {
    const [actualPassword, setActualPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [wrongPassword, setWrongPassword] = useState(false)
    const [likeOldPasswordError ,setLikeOldPasswordError] = useState(false)

    const [passwordMatchError, setPasswordMatchError] = useState(false)

    // new password error
    const [requirementError, setRequirementError] = useState(false)
    const [lengthError, setLengthError] = useState(true)
    const [uppercaseError, setUppercaseError] = useState(true)
    const [lowercaseError ,setLowercaseError] = useState(true)
    const [digitError, setDigitError] = useState(true)

    const handleNewPassword = (e) => {
        e.preventDefault();
        setNewPassword(e.target.value);
        
        e.target.value.length < 6 ? setLengthError(true) : setLengthError(false);
        /[A-Z]/.test(e.target.value) ? setUppercaseError(false) : setUppercaseError(true);
        /[a-z]/.test(e.target.value) ? setLowercaseError(false) : setLowercaseError(true);
        /\d/.test(e.target.value) ? setDigitError(false) : setDigitError(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(api('users/id/'+props.user.id), {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        }).then((res) => {
            res.json().then((res) => {
                sha1(actualPassword);
                var pswd = sha1.create();
                pswd.update(actualPassword);

                if(res[0].mdp == pswd.hex()) {
                    setWrongPassword(false)
                } else {
                    setWrongPassword(true)
                    return false;
                }

                if(newPassword == confirmPassword) {
                    setPasswordMatchError(false)
                } else {
                    setPasswordMatchError(true)
                    return false;
                }

                sha1(newPassword);
                var newPswd = sha1.create();
                newPswd.update(newPassword);
                
                if(res[0].mdp == newPswd.hex()) {
                    setLikeOldPasswordError(true)
                // } else if(!lengthError && !uppercaseError && !lowercaseError && !digitError)
                } else if(lengthError || uppercaseError || lowercaseError || digitError) {
                    setRequirementError(true);
                } else {
                    setRequirementError(false) 
                    setLikeOldPasswordError(false)
                }

                if(!wrongPassword && !likeOldPasswordError && !requirementError && !passwordMatchError) {
                    fetch(api('users/mdp/'+props.user.id), {
                        headers: {"Content-Type": "application/json"},
                        method: "PUT",
                        body: JSON.stringify({"mdp": newPassword})
                    }).then((res) => {
                        if(res.ok) {
                            $('#updatePasswordModal').modal('hide');
                            swal("Mot de passe changé", {
                                icon: "success",
                                button:false,
                                timer: 2000
                            });
                        }
                    })
                }
            })
        })
    }

    return (
        <>
            <div className="modal-content">
                <div className="modal-body my-4" style={{marginInline: "10%"}}>
                    <h2 className="mb-5 text-center">Mise à jour du mot de passe</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="tab">
                                <div className="form-group">
                                    <input type="password" id="actualPassword" name="actualPassword" className="form-control" value={actualPassword} onChange={(e) => setActualPassword(e.target.value)} placeholder=" " required/>
                                    <label className="form-label">Mot de passe actuel</label>
                                    { wrongPassword && <span className='error'>Mot de passe incorrecte</span> }
                                </div>
                            </div>
                            <div className="tab">
                                <div className="form-group">
                                    <input type="password" id="newPassword" name="newPassword" className="form-control" value={newPassword} onChange={(e) => handleNewPassword(e)} placeholder=" " required/>
                                    <label className="form-label">Nouveau mot de passe</label>
                                </div>
                            </div>
                            <div className="tab mb-4">
                                <div className="form-group">
                                    <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder=" " required/>
                                    <label className="form-label">Confirmer le mot de passe</label>
                                    {passwordMatchError  && <span className='error'>Les mots de passe ne sont pas identiques</span> }
                                </div>
                            </div>
                            
                            {likeOldPasswordError &&
                            <div className="tab mb-4">
                                <div class="alert alert-danger" role="alert">
                                    Le nouveau mot de passe doit être différent du mot de passe actuel.
                                </div>
                            </div>}
                            {requirementError &&
                            <div className="tab mb-4">
                                <div class="alert alert-danger" role="alert">
                                    Veuillez respecter les exigences pour créer un nouveau mot de passe.
                                </div>
                            </div>}

                            <span className="stext-102 cl3 size-205">Le mot de passe doit contenir</span>
                            <ul className="mt-2">
                                <li>
                                    {lengthError ?
                                    <i className="fa-sharp fa-solid fa-minus mr-2"></i> :
                                    <i className="fa-sharp fa-regular fa-circle-check mr-2"></i>}
                                    <span className="stext-102 cl6" style={{fontSize: "13px"}}>Au minimum 6 caractères</span>
                                </li>
                                <li>
                                    {uppercaseError ? 
                                    <i className="fa-sharp fa-solid fa-minus mr-2"></i> :
                                    <i className="fa-sharp fa-regular fa-circle-check mr-2"></i> }
                                    <span className="stext-102 cl6" style={{fontSize: "13px"}}>Au moins une lettre majuscule</span>
                                </li>
                                <li>
                                    {lowercaseError ? 
                                    <i className="fa-sharp fa-solid fa-minus mr-2"></i> :
                                    <i className="fa-sharp fa-regular fa-circle-check mr-2"></i>     }
                                    <span className="stext-102 cl6" style={{fontSize: "13px"}}>Au moins une lettre minuscule</span>
                                </li>
                                <li>
                                    {digitError ? 
                                    <i className="fa-sharp fa-solid fa-minus mr-2"></i> :
                                    <i className="fa-sharp fa-regular fa-circle-check mr-2"></i> }
                                    <span className="stext-102 cl6" style={{fontSize: "13px"}}>Au moins un chiffre</span>
                                </li>
                            </ul>

                        {/* Submit button */}
                        <button type="submit" id="submit-btn" className="btn btn-primary btn-block btn-shadow mt-5">Enregistrer</button>
                        <button type="submit" id="submit-btn" data-dismiss="modal" className="btn btn-secondary btn-block btn-shadow" onClick={(e) => {e.preventDefault()}}>Annuler</button>
                    </form>

                </div>
                {/* <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-primary">Confirmer</button>
                </div> */}
            </div>
        </>
    );

}
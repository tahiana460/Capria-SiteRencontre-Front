import { Component } from 'react'
import api from "../const/api"
import './Registration.css'

export class Registation_step1 extends Component {

    // state = { isOk: false };

    continue = e => {
        e.preventDefault();
        // checkError();
        this.props.nextStep();
    };

    state = {
        errorPseudo: false,
        errorEmail: false,
        errorEmailExistence:false,
        errorPassword: false,
        errorConfirmPassword: false
    };

  render () {
    const { errorPseudo, errorEmail, errorEmailExistence, errorPassword, errorConfirmPassword } = this.state;

    const {values, inputChange, login} = this.props;

    const checkError = e => {
        e.preventDefault();

        // CHECK PSEUDO
        fetch(api('users/pseudo/'+values.pseudo), {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        }).then((res) => {
            res.json().then((data) => {
                if(data.length != 0) {
                    this.setState({ errorPseudo: true })
                }
                else {
                    this.setState({ errorPseudo: false });

                    // CHECK EMAIL
                    fetch(api('users/email/'+values.email), {
                        headers: {"Content-Type": "application/json"},
                        method: "GET"
                    }).then((res) => {
                        res.json().then((data) => {
                            if(data.erreur){
                                this.setState({errorEmailExistence:true})
                            }
                            else if(data.length != 0) {
                                // console.log('misy', errorEmail)
                                this.setState({ errorEmail: true })
                            }
                            else {
                                this.setState({ errorEmail: false });

                                // CHECK PASSWORD
                                if(values.password.length < 6) {
                                    this.setState({ errorPassword: true})
                                } else {
                                    this.setState({ errorPassword: false })

                                     // CHECK CONFIRM PASSWORD
                                    if(values.password != values.confirm_password) {
                                        this.setState({ errorConfirmPassword: true })
                                    } else {
                                        this.setState({ errorConfirmPassword: false })
                                        this.continue(e);
                                    }
                                }
                            }
                        })
                    })

                }
            })
        })
    }

    return (
        <>
            <h2 className="fw-bold mb-5">Créer votre compte</h2>
                    {/* <form id="registration-form" method="POST" > */}
                    <form onSubmit={checkError}>
                        <div className="tab">
                            <div className="form-group">
                                <input type="text" id="pseudo" name="pseudo" className={errorPseudo ? "form-control in-error" : "form-control"} placeholder=" " onChange={inputChange('pseudo')} value={values.pseudo} required/>
                                <label className="form-label">Pseudo</label>
                                { errorPseudo && <span className='error'>Ce pseudo est déjà pris</span> }
                            </div>

                            <div className="form-group mt-4">
                                <input type="email" id="email" name="email" onChange={inputChange('email')} value={values.email} className={errorEmail ? "form-control in-error" : "form-control"} placeholder=" " required/>
                                <label className="form-label">Adresse email</label>
                                { errorEmail && <span className='error'>Cet email est déjà pris</span> }
                                { errorEmailExistence && <span className='error'>Cet email n'existe pas</span> }
                            </div>
            
                            <div className="form-group mt-4">
                                <input type="password" id="password" onChange={inputChange('password')} value={values.password} name="password" className={errorPassword ? "form-control in-error" : "form-control"} placeholder=" " required/>
                                <label className="form-label" htmlFor='password'>Mot de passe</label>
                                { errorPassword && <span className='error'>Le mot de passe doit contenir au moins 6 caractères</span> }
                            </div>

                            <div className="form-group mb-4">
                                <input type="password" id="confirm_password" onChange={inputChange('confirm_password')} value={values.confirm_password} className={errorConfirmPassword ? "form-control in-error" : "form-control"} placeholder=" " required/>
                                <label className="form-label" htmlFor="confirm_password">Confirmer votre mot de passe</label>
                                { errorConfirmPassword && <span className='error'>Les mots de passes ne sont pas identiques</span> }
                            </div>
                        </div>

                        {/* <!-- Checkbox --> */}
                        {/* <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                        <label className="form-check-label" htmlFor="form2Example33">
                            Subscribe to our newsletter
                        </label>
                        </div> */}
        
                        {/* <!-- Register buttons --> */}
                        {/* <div className="text-center">
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                        </div> */}
                    {/* </form> */}

                    {/* Submit button */}
                    <button type="submit" id="submit-btn" className="btn btn-primary btn-block mb-4 btn-shadow">Suivant</button>
                </form>
                <p>Vous avez déjà un compte? <a href='/login'>Connectez-vous</a></p>
            </>
    )
  }
}

export default Registation_step1
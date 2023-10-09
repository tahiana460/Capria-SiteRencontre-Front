import { Component } from 'react'

export class Registation_step2 extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    state = {
        errorDateOfBirth: false
    }

  render () {
    const { errorDateOfBirth } = this.state;

    const {values, inputChange} = this.props;

    const checkError = e => {
        e.preventDefault();
        const currentDate = new Date();
        const dateOfBirth = new Date(values.date_of_birth);

        const diffDays = Math.ceil(Math.abs(currentDate - dateOfBirth) / (1000 * 60 * 60 * 24)); 

        const diffYears = parseInt(diffDays/365);
        // console.log(diffYears);

        if(diffYears < 18) {
            this.setState({ errorDateOfBirth: true })
        } else {
            this.setState({ errorDateOfBirth:false })
            this.continue(e)
        }
    }

    return (
        <>
            <h2 className="fw-bold mb-5">Information personnelle</h2>
                    <form onSubmit={checkError}>
                        <div className="tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" id="name" onChange={inputChange('name')} value={values.name} name="name" className="form-control" placeholder=" " required/>
                                        <label className="form-label">Nom</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" id="firstname" onChange={inputChange('firstname')} value={values.firstname} name="firstname" className="form-control" placeholder=" " required/>
                                        <label className="form-label">Prénom(s)</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        {/* <input type="text" id="gender" onChange={inputChange('gender')} value={values.gender} name="gender" className="form-control" placeholder=" " /> */}
                                        {/* <label className="form-label">Genre</label> */}
                                        <select name="gender" id="gender" className="form-control" onChange={inputChange('gender')} value={values.gender} required>
                                            <option value="">Genre</option>
                                            <option value="H">Homme</option>
                                            <option value="F">Femme</option>
                                            <option value="A">Autre</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="date" name="date_of_birth" onChange={inputChange('date_of_birth')} value={values.date_of_birth} id="date_of_birth" className={errorDateOfBirth ? "form-control in-error" : "form-control"} placeholder=" " required/>
                                        <label className="form-label">Date de naissance</label>
                                        { errorDateOfBirth && <span className='error'>Date de naissance invalide</span> }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" id="city" onChange={inputChange('city')} value={values.city} name="city" className="form-control" placeholder=" " required/>
                                        <label className="form-label">Ville</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" id="nationality" onChange={inputChange('nationality')} value={values.nationality} name="nationality" className="form-control" placeholder=" " required/>
                                        <label className="form-label">Nationalité</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                {/* <input type="text" id="sexual_orientation" onChange={inputChange('sexual_orientation')} value={values.sexual_orientation} name="sexual_orientation" className="form-control" placeholder=" " />
                                <label className="form-label">Orientation sexuelle</label> */}
                                <select name="sexual_orientation" style={{backgroundColor: "transparent"}} id="sexual_orientation" className="form-control" onChange={inputChange('sexual_orientation')} value={values.sexual_orientation} required>
                                    <option value="">Orientation sexuelle</option>
                                    <option value="Hetero">Hétérosexuel</option>
                                    <option value="Homo">Homosexuel</option>
                                </select>
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
                    {/* <button type="submit" id="submit-btn" className="btn btn-primary btn-block mb-4 btn-shadow">Suivant</button> */}
                    <button type="submit" id="submit-btn" className="flex-c-m stext-101 bg2 hov-btn1 size-116 p-lr-15 trans-04 mb-3">Suivant</button>
                    {/* <button id="back-btn" onClick={this.back} className="btn btn-light btn-block mb-4 btn-shadow"> */}
                    <button id="back-btn" onClick={this.back} className="flex-c-m stext-101 bg2 hov-btn1 size-116 p-lr-15 trans-04 mb-3">
                        Retour
                    </button>
                </form>
                <p>Vous avez déjà un compte? <a href='/login'>Connectez-vous</a></p>
            </>
    )
  }
}

export default Registation_step2
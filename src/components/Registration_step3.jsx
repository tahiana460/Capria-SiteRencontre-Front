import { Component } from 'react';
import api from "../const/api";

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="profile_picture" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img htmlFor="profile_picture" src={src}/>
      </div>
      <input id="profile_picture" name='profile_picture' type="file" onChange={onChange}/> 
    </label>
    
// const navigate = useNavigate(); 

export class Registation_step3 extends Component {
    
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

  render () {

        const {values, changeProfilePicture} = this.props;

        const {
            values: { pseudo, email, password, confirm_password, name, firstname, gender, date_of_birth, city, nationality, sexual_orientation, profile_picture, profile_picture_file }
        } = this.props;

        const photoUpload = e =>{
            e.preventDefault();
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
                changeProfilePicture(file, reader.result)
                // console.log(profile_picture_file)
            }
            reader.readAsDataURL(file);
        }

        const uploadPhoto = async () => {
            let photo = values.profile_picture_file;
            // let formData = new FormData();
                
            // formData.append("photo", photo);
            await fetch('public/photo', {
                method: "POST",
                // body: formData,
                body: photo,
                headers: {
                    'content-type': photo.type,
                    'content-length': `${photo.size}`,
                  },
            });
            // console.log(photo.size);
        }

        const register = (e) => {
            e.preventDefault()
            // console.log(values);

            if(values.profile_picture_file) uploadPhoto();

            fetch(api('users/'), {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "firstname": firstname,
                    "email": email,
                    "password": password,
                    "pseudo": pseudo,
                    "profile_picture": profile_picture_file.name,
                    "gender": gender,
                    "date_of_birth": date_of_birth,
                    "city": city,
                    "nationality": nationality,
                    "sexual_orientation": sexual_orientation
                })
            }).then((res) => {
                if(res.ok) {
                    window.location.href = '/';
                } else {
                    throw Error("Error")
                }
            }).catch(() => {
                console.log('Error');
            })
        }


        return (
            <>
                <h2 className="fw-bold mb-5">Photo de profile</h2>
                <div>
                    <ImgUpload onChange={photoUpload} src={profile_picture} value={values.profile_picture}/>

                    {/* Submit button */}
                    <button type="submit" id="submit-btn" onClick={register} className="btn btn-primary btn-block mb-4 btn-shadow">S'inscrire</button>
                    <button id="back-btn" onClick={this.back} className="btn btn-light btn-block mb-4 btn-shadow">
                        Retour
                    </button>
                    
                </div>
            </>
        )
  }
}

export default Registation_step3
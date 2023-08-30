import { Component } from 'react';
import api from "../const/api";
//var faceapi='../../public/js/face-api.js'
import {Buffer} from 'buffer';

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
    state = {
        errorPdp: false,
    };

  render () {

        const {values, changeProfilePicture} = this.props;
        const  {errorPdp} = this.state;


        const {
            values: { pseudo, email, password, confirm_password, name, firstname, gender, date_of_birth, city, nationality, sexual_orientation, profile_picture, profile_picture_file }
        } = this.props;

        const photoUpload = e =>{
            e.preventDefault();
            const reader = new FileReader();
            const file = e.target.files[0];
            let contentType=file.type 
            reader.onloadend = () => {
                changeProfilePicture(file, reader.result)
            }
            reader.readAsDataURL(file);
            file.arrayBuffer().then((ress)=>{
                const fileBlob=new Int8Array(ress) 
                fetch(api('users/checkPdp/'), {
                    headers: {"Content-Type": contentType},
                    method: "POST",
                    body: fileBlob
                }).then((res)=>res.json()).then((res) => {
                    //console.log(res)
                    //console.log(res)
                    if(res.nb!=1){
                        this.setState({errorPdp:true})
                    }else{
                        this.setState({errorPdp:false})
                    }
                }).catch(() => {
                    console.log('Error');
                })                           
            })
        }

        const uploadPhoto = async () => {            
            let photo = values.profile_picture_file;
            const body = new FormData();
                       
            photo.arrayBuffer().then((res)=>{
                const fileBlob=photo
                body.append("image",fileBlob)
                fetch('https://api.imgbb.com/1/upload?key=dbeec0e3599490973977d041a34dbbde',{
                    method: "POST",
                    
                    body
                }).then((ress)=>{
                    
                    ress.json().then((jsonRes)=>{
                        if(jsonRes.status==200){
                            console.log(jsonRes.data.url)
                            return jsonRes.data.url
                        }                   
                    })
                })
            })
        }

       

        const register = async (e) => {
            e.preventDefault()
            // console.log(values);
            //if(values.profile_picture_file) urlPhoto=await uploadPhoto();
            if(values.profile_picture_file) {
                const body = new FormData();
                body.append("image",values.profile_picture_file)
                fetch('https://api.imgbb.com/1/upload?key=dbeec0e3599490973977d041a34dbbde',{
                    method: "POST",
                    
                    body
                }).then((ress)=>{
                    
                    ress.json().then((jsonRes)=>{
                        if(jsonRes.status==200){
                            //console.log(jsonRes.data.url)
                            const urlPhoto=jsonRes.data.url
                            fetch(api('users/'), {
                                headers: {"Content-Type": "application/json"},
                                method: "POST",
                                body: JSON.stringify({
                                    "name": name,
                                    "firstname": firstname,
                                    "email": email,
                                    "password": password,
                                    "pseudo": pseudo,
                                    //"profile_picture": profile_picture_file.name,
                                    "profile_picture": urlPhoto,
                                    "gender": gender,
                                    "date_of_birth": date_of_birth,
                                    "city": city,
                                    "nationality": nationality,
                                    "sexual_orientation": sexual_orientation
                                })
                            }).then((res)=>res.json()).then((res) => {
                                //console.log(res)
                                const id=res.insertId                
                                if(res.ok) {
                                    //console.log('redirect accueil')
                                    window.location.href = '/accueil?id='+id;
                                } else {
                                    throw Error("Error")
                                }         
                            }).catch(() => {
                                console.log('Error');
                            })
                        }                   
                    })
                })
            }
            /*console.log(urlPhoto)
            if(urlPhoto=='') urlPhoto='./photo/default.jpg'

            fetch(api('users/'), {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "firstname": firstname,
                    "email": email,
                    "password": password,
                    "pseudo": pseudo,
                    //"profile_picture": profile_picture_file? profile_picture_file.name : 'default.jpg',
                    "profile_picture": urlPhoto,
                    "gender": gender,
                    "date_of_birth": date_of_birth,
                    "city": city,
                    "nationality": nationality,
                    "sexual_orientation": sexual_orientation
                })
            }).then((res)=>res.json()).then((res) => {
                //console.log(res)
                const id=res.insertId                
                if(res.ok) {
                    // window.location.href = '/accueil?id='+id;

                    Cookies.set('userFromCookie', JSON.stringify(res))
                } else {
                    throw Error("Error")
                }         
            }).catch(() => {
                console.log('Error');
            })*/
        }


        return (
            <>
                <h2 className="fw-bold mb-5">Photo de profile</h2>
                <div>
                    <ImgUpload onChange={photoUpload} src={profile_picture} value={values.profile_picture}/>
                    <br/>
                    { errorPdp && <span className='error'>Image invalide. Elle ne contient pas de visage ou est une photo de groupe.</span> }
                    {/* Submit button */}
                    {/* <button type="submit" id="submit-btn" onClick={register} className="btn btn-primary btn-block mb-4 btn-shadow">S'inscrire</button> */}
                    <button type="submit" id="submit-btn" onClick={register} class="flex-c-m stext-101 bg2 hov-btn1 size-116 p-lr-15 trans-04 mb-3">S'inscrire</button>
                    {/* <button id="back-btn" onClick={this.back} className="btn btn-light btn-block mb-4 btn-shadow"> */}
                    <button id="back-btn" onClick={this.back} class="flex-c-m stext-101 bg2 hov-btn1 size-116 p-lr-15 trans-04 mb-3">
                        Retour
                    </button>
                    
                </div>
                <p>Vous avez déjà un compte? <a href='/login'>Connectez-vous</a></p>
                
            </>
        )
  }
}

export default Registation_step3
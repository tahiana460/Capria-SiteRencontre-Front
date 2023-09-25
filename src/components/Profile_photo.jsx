
import { Component, useState } from 'react';
import api from "../const/api";

export class Profile_photo extends Component{
    
    
  
    render(){
      const user=this.props.user
      //console.log('USER='+user)
      var picture= ''

      const changePicture=e =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            picture=file
        }
        reader.readAsDataURL(file);        
      }

      const upload= async (e)=>{
        e.preventDefault
        console.log('UPLOAD')
        const image=document.getElementById('image')
        console.log(image)
        const file = image.files[0];
        console.log(file)
        const body = new FormData();
        body.append("image",file)
        fetch('https://api.imgbb.com/1/upload?key=dbeec0e3599490973977d041a34dbbde',{
          method: "POST",        
          body
        }).then((res)=>{
          res.json().then((resJson)=>{
            console.log(resJson)            
            const urlPhoto=resJson.data.url
            fetch(api('users/upload'), {
              headers: {"Content-Type": "application/json"},
              method: "POST",
              body: JSON.stringify({
                  "id": user.id,
                  "url": urlPhoto
              })
            }).then((ress)=>ress.json()).then((res) => {
                console.log(res)            
                if(res.ok) {
                    //console.log('redirect accueil')
                    alert('Image téléchargée!')
                    window.location.href = '/profile?id='+user.id;
                } else {
                  alert('Une erreur est survenue, veuillez réessayer')
                }         
            }).catch(() => {
                console.log('Error');
            })
          })        
        })      
      }
      return(
        <div>
          <h5 className="mtext-108 cl2 p-b-7">
              Importer une photo
          </h5>
  
          <div className="row p-b-25">
              <div className="col-12 p-b-5">
                  <label className="stext-102 cl3" htmlFor="review">Sélectionnez une photo</label>
                  <input type="file" id="image" name="photo" onChange={changePicture}  />
              </div>
          </div>
  
          <button 
            className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10" onClick={upload}
           >
              Importer
          </button>
        </div>
      )

    }

    
  
}



export default Profile_photo;
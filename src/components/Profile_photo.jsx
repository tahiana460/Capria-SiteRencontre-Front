
function Profile_photo(){
  
    const upload= async (e)=>{
      e.preventDefault
      console.log('UPLOAD')
      console.log(e)
      const file = e.target.files[0];
      console.log(file)
      await fetch('public/photo', {
        method: "POST",
        // body: formData,
        body: file,
        headers: {
            'content-type': file.type,
            'content-length': `${file.size}`,
          },
      });
    }

    return(
      <div>
        <h5 className="mtext-108 cl2 p-b-7">
            Importer une photo
        </h5>

        <div className="row p-b-25">
            <div className="col-12 p-b-5">
                <label className="stext-102 cl3" for="review">Sélectionnez une photo</label>
                <input type="file" id="image" name="photo" onChange={upload}  />
            </div>
        </div>

        <button 
          className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10"
         >
            Importer
        </button>
      </div>
    )
  
}



export default Profile_photo;
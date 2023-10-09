import {useEffect, useState,useRef} from 'react'
import api from '../const/api.js';
import ProfilePhoto from './Profile_photo.jsx';
import '../../public/css/profile_photo.css';
import './slick/slick.css';
import './slick/slick-theme.css';
import './slick/slick.min.js'
import './slick/slick-custom.js'
import './slick/slick-gallery.js'
import './slick/main-slick.css'
//import slick from './slick'

export default function Profile_photo_component(props){
    //console.log('USER PHOTO')
      //    console.log(props.user)
    
    const moi=props.moi
    const user=props.user
    const [photos,setPhotos]=useState([])

    const photoRef=useRef(null)

    const initilisation  = () =>{
        var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
      	myHeaders.append("Accept", "application/json");            
                  
        fetch(api('users/images/'+user.id), {
            headers: myHeaders,
            method:'GET'
        }).then((res)=>{
            res.json().then((res)=>{
                setPhotos(res)
            })
        })
        //slick()
        
    }
    function clickImage(e){
        //console.log(event.target.id)
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
        console.log(e.target.id)
        const index=(parseInt(e.target.id.split('js-modal1-')[1]))
        //$('.slick3').slick(index)
        //$('.item-slick3').slick('slickRemove', 0);
        //$('#slickGalerie').slick('slickGoTo',index)
        $('.slick3').slick('slickGoTo',index)
        //console.log(index)
        //var slick1 = $(this).find('.slick3');
        //console.log(slick1)
    }

    function closePhoto(){
        $('.js-modal1').removeClass('show-modal1');
    }


    useEffect(()=>{     //console.log('USER PHOTO INITTT')
    //console.log(props.user)     
        //initilisation()
    },[])
    initilisation()

    /*useEffect((event)=>{
        clickImage(event)
    },[])*/
    /*useEffect(()=>{
        var ids=document.querySelectorAll('[id^=js-modal1-]')
        for(id in ids){
            if(ids[id] instanceof HTMLImageElement){
                ids[id].addEventListener('click', clickImage);
            }
        }
    },[])*/

    return (
        <>
        <div className="tab-pane fade" id="photo" role="tabpanel" >
            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                <div className="p-b-30 m-lr-15-sm" style={{"display": "block"}} >
                    
                        {moi==1&&
                        <><ProfilePhoto user={user}  /><hr/></>
                        }
                            <div className="row ">
                                {photos.map((profil)=>(
                                    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35" >
                                        <div className="block2" >
                                            <div className="block2-pic hov-img0 block-img">
                                                <img className="js-show-modal1" src={profil.url} alt="IMG-PRODUCT" id={"js-modal1-"+photos.indexOf(profil)} onClick={(e)=>clickImage(e)}  ref={photoRef} />
                                                {moi==1&&
                                                    <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                                        <img className="icon-heart1 dis-block trans-04" src="/images/icons/icon-close2.png" alt="ICON" style={{'width': '5px','height':'5px'}} 
                                                        id={'img'+profil.id}/>
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> 
                    
                </div>
            </div>
    </div>


        <div className="wrap-modal1 js-modal1 p-t-60 p-b-20">
            <div className="overlay-modal1 js-hide-modal1" onClick={(e)=>{closePhoto()}}></div>

            <div className="container">
                <div className="bg0 p-t-60 p-b-15 p-lr-15-lg how-pos3-parent">
                    <button className="how-pos3 hov3 trans-04 js-hide-modal1" onClick={(e)=>{closePhoto()}}>
                        <img src="/images/icons/icon-close.png" alt="CLOSE"/>
                    </button>

                    <div className="row">
                        <div className="col-md-2" ></div>
                        <div className="col-md-6 col-lg-7 p-b-25">
                            <div className="p-l-25 p-r-30 p-lr-0-lg">
                                <div className="wrap-slick3 flex-sb flex-w">
                                    <div className=""></div>
                                    <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                                    <div className="slick3 gallery-lb" id='slickGalerie'>								
                                        {photos.map((photo)=>(
                                            <div className="item-slick3" data-thumb={photo.url}>
                                                <div className="wrap-pic-w pos-relative">
                                                    <img src={photo.url} alt="IMG-PRODUCT"/>

                                                    
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>					
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}
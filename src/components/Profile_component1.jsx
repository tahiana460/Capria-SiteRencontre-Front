
//import ProfileAbout from '../components/Profile_about.jsx'
import Profile_about_component from '../components/Profile_about_component'
//import ProfileAccount from '../components/Profile_Account.astro'
import Profile_account_component from '../components/Profile_account_component'
//import ProfilePhoto from '../components/Profile_photo.astro'
import Profile_photo_component from '../components/Profile_photo_component'
import ProfleEdit from '../components/Profile_edit.jsx'
import api from "../const/api"
import Profile_vues_component from '../components/Profile_vues_component'
import UpdatePassword from '../components/Update_password'
import ProfileComponent from '../components/Profile_component'
import {Component} from 'react'
import './profile.css'

export class Profile_component1 extends Component{

    constructor(props){
        super(props)
        this.state ={
            user:{},
            visitedId:this.props.visitedId,
            vues:[],
            moi:0,
            nbVue:0            
        }
    }
    
    initialisation = ()=>{
        var current_user=JSON.parse(localStorage.getItem('user'))[0]
        current_user=current_user.id
        this.setState({user:JSON.parse(localStorage.getItem('user'))[0]})
        if(this.state.visitedId!=current_user){
            fetch(api('users/id/'+this.state.visitedId)).then((response) =>{
                response.json().then((res)=>{
                    this.setState({user:res[0]})
                    localStorage.setItem('userProfil',JSON.stringify(res[0]))
                    localStorage.setItem('moi',0)
                })
            });
            var obj={'visitor_id':current_user,'visited_id':this.state.visitedId}
            const jsonString = JSON.stringify(obj);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

        //console.log(jsonString);
            fetch(api('views/add'), {
                headers: myHeaders,
                method:'POST',
                body:jsonString
            });
        }else{            
            localStorage.setItem('userProfil',localStorage.getItem('user'))
            localStorage.setItem('moi',1)
            this.setState({moi:1})
            this.setState({user:JSON.parse(localStorage.getItem('user'))[0]})
        }
        fetch(api('views/visitor/'+this.state.visitedId)).then((response) => {
            response.json().then((res)=>{
                this.setState({vues:res,nbVue:res.length})
            })
        })
    }
    componentWillMount(){
        this.initialisation()
        console.log('add user profil')
        //console.log(this.state.user)
        //console.log(this.state.moi)
        //console.log(localStorage.getItem('moi'))
        //console.log(localStorage.getItem('userProfil'))
    }

    render(){
        return(
            <>
                {this.state.moi==0 &&  <ProfileComponent user={JSON.stringify([this.state.user])} visitedId={this.state.visitedId}  />}
                
                <section className="sec-product-detail bg0 p-t-65 p-b-60">
                    <div className="container">
                        <div className="p-t-33">
                            <div className="profile-pic-div bg-dark">
                                <img src={this.state.user.photoDeProfil} id="imgPhoto"  />                                
                            </div>
                            <div className="mt-4">
                                <h2 className="text-center">{this.state.user.pseudo}</h2>
                                <p className="text-center">{this.state.nbVue} vue(s)</p>
                            </div>
                        </div>

                        <div className="bor10 mt-4 p-t-43 p-b-40">
                            <div className="tab01">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item p-b-10">
                                        <a className="nav-link active" data-toggle="tab" href="#about" role="tab">A propos</a>	
                                    </li>
                                    
                                    {this.state.moi==1 &&
                                    <li className="nav-item p-b-10">
                                        <a className="nav-link" data-toggle="tab" href="#myAccount" role="tab">Mon compte</a>
                                    </li>
                                    }

                                    <li className="nav-item p-b-10">
                                        <a className="nav-link" data-toggle="tab" href="#photo" role="tab">Photo</a>
                                    </li>

                                    {this.state.moi==1 &&
                                    <li className="nav-item p-b-10">
                                        <a className="nav-link" data-toggle="tab" href="#vues" role="tab">Vues</a>
                                    </li>
                                    }
                                </ul>
                                
                                <div className="tab-content p-t-43" style={{"display": "block"}}>
                                    
                                    <Profile_about_component user={this.state.user} moi={this.state.moi} />
                                    
                                    <div className="modal fade" id="profileEditModal" tabindex="-1" role="dialog" aria-labelledby="profileEditModalTitle" data-backdrop="static" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{"top": "15%"}} role="document">
                                            <ProfleEdit user={this.state.user}  />
                                        </div>
                                    </div>

                                    {this.state.moi==1&&
                                    <><Profile_account_component user={this.state.user} />
                                    <div className="modal fade" id="updatePasswordModal" tabindex="-1" role="dialog" aria-labelledby="updatePasswordModalModalTitle" data-backdrop="static" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{"top": "15%"}} role="document">
                                            <UpdatePassword user={this.state.user}  />
                                        </div>
                                    </div></>
                                    }
                                    <Profile_photo_component moi={this.state.moi} user={this.state.user}  />

                                    {this.state.moi==1&&
                                    <Profile_vues_component vues={this.state.vues} />
                                    }
                                    
                                    
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                

            </>
        )
    }
}

export default Profile_component1
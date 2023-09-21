import ChatComponent from './Chat'
import {useState,useEffect,Component} from 'react'
import api from '../const/api'

export class Chat extends Component{

    constructor(){
        super()
        this.state={
            user:JSON.parse(localStorage.getItem('user'))[0],
            users: [],
            nbMsg: 0,
            checkAbo:true,
            abonnement: {},
            chatActive: {},        
        };   
    }

    /*state = {
        user:JSON.parse(localStorage.getItem('user'))[0],
        users: [],
        nbMsg: 0,
        checkAbo:true,
        abonnement: {},
        chatActive: {},        
    };    */

    initialisation =  ()=>{
                    
        const abo=localStorage.getItem('abonnement')
        const limitMsg=5
        if (abo==''){
            this.setState({abonnement:(JSON.stringify({})),checkAbo:false})
            /*abonnement=(JSON.stringify({}))
            checkAbo=(false)*/
        }else if(abo!=null){
            //abonnement=(JSON.parse(abo))
            this.setState({abonnement:JSON.parse(abo)})
            const aboJson=JSON.parse(abo)
            /* get nb de messages deja envoye*/
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");
            const objNb={sender_id:this.state.user.id,date_debut:aboJson.date_debut}
            const objString=JSON.stringify(objNb)
            fetch(api("messages/nbMsg"), {
                headers: myHeaders,
                method:'POST',
                body:objString
            }).then((res)=>{
                res.json().then((res)=>{
                    //nbMsg=(res[0].nb)
                    const nb=res[0].nb
                    this.setState({nbMsg:nb})
                    localStorage.setItem('nbMsg',nb)
                    var check=0
                    console.log(nb>=limitMsg)
                    if(nb>=limitMsg){
                        //checkAbo=(false)
                        check=1
                        this.setState({checkAbo:false})
                    }
                    console.log('NB MSG')
                    console.log(nb)
                    console.log(check)
                    localStorage.setItem('checkAbo',check)
                })
            })
        }
        var obj={'id':this.state.user.id,'filtres':[]}
        //console.log(obj)
        const jsonString = JSON.stringify(obj);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        fetch(api("userList"), {
            headers: myHeaders,
            method:'POST',
            body:jsonString
        }).then((res)=>{
            res.json().then((res)=>{
                /*users=(res)
                chatActive=(users[0])*/
                var active=res[0]
                if(this.props.idChatActive!='null'){
                    const idChatActive=this.props.idChatActive
                    if(res.findIndex(i => i.id==idChatActive) > -1){
                        //chatActive=users.filter(i => i.id == idChatActive)[0]
                        //chatActive=(users.filter(i => i.id == idChatActive)[0])
                        active=(res.filter(i => i.id == idChatActive)[0])
                    }
                }
                //localStorage.setItem('activatedChat',JSON.stringify(active))
                localStorage.setItem('userChatActive',JSON.stringify(active))
                localStorage.setItem('activatedChat',active.id)
                this.setState({users:res,chatActive:active})
                
            })
        })  
    };
    //initialisation();

    componentWillMount(){
        this.initialisation()
    }
    
    render(){
        //this.initialisation()
        /*{
            this.state.chatActive!={}&&
            (<Child data={this.state} />)
        }*/
        //initialisation()
        return(<ChatComponent user={this.state.user} users={this.state.users} nbMsg={this.state.nbMsg} checkAbo={this.state.checkAbo} abonnement={this.state.abonnement} chatActive={this.state.chatActive}  />)
        /*return (
            {this.state.chatActive && 
                (<ChatComponent user={this.state.user} users={this.state.users} nbMsg={this.state.nbMsg} checkAbo={this.state.checkAbo} abonnement={this.state.abonnement} chatActive={this.state.chatActive}  />)
            }            
            
        );*/
    }
    
}
const Child = ({data}) => (
    <ChatComponent user={data.user} users={data.users} nbMsg={data.nbMsg} checkAbo={data.checkAbo} abonnement={data.abonnement} chatActive={data.chatActive}  />
);
export default Chat
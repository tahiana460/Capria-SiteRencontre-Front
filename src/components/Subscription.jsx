import { useEffect, useState } from "react";
import api from '../const/api';
import './subscription.css';

export default function Subscription(props) {
    const [subscription, setSubscription] = useState()
    const [subscriptionActive, setSubscriptionActive] = useState()

    useEffect(() => {
        fetch(api('subscription'), {
            headers: {"Content-Type": "application/json"},
            method: "GET",
        }).then((res) => {
            res.json().then((res) => {
                setSubscription(res);
            })
        })

        fetch(api('subscription/'+props.user.id), {
            headers: {"Content-Type": "application/json"},
            method: "GET",
        }).then((res) => {
            if(res.ok) {
                res.json().then((res) => {
                    let endDate = new Date(res[0].date_fin).setHours(0, 0, 0, 0);

                    endDate >= new Date().setHours(0, 0, 0, 0) && setSubscriptionActive(res[0])
                    console.log(res[0]);
                })
            } else console.log(props.user.id);
            
        })
    }, [])

    const subscribe = (sub) => {

        const today = new Date();
        let end_date = moment(today.getFullYear()+'-'+(today.getMonth()+sub.duree+1)+'-'+today.getDate(), 'yyyy-mm-dd');

        fetch(api('subscription'), {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({
                "id_abo": sub.id,
                "id_user": props.user.id,
                "date_fin": end_date._i,
                "prix": sub.prix
            })
        }).then((res) => {
            if(res.ok) {
            } else throw Error("Error")
        }).catch(() => {
            console.log('Error');
        })

        swal('Payement effectué.', "Merci pour votre abonnement", "success");
    }
    

    return (
        <>
            <div id="generic_price_table">
                <section>

                        {/* BLOCK ROW START */}
                        <div className="row">
                            {subscription&& subscription.map((sub, index) => {
                                return (
                                <div key={index} className="col-md-4">
                                    <div className={subscriptionActive && subscriptionActive.id_abo == sub.id ? "generic_content active clearfix" : "generic_content clearfix"} style={{boxShadow: "0 0 30px -20px"}}>
                                        <div className="generic_head_price clearfix">
                                        
                                            {/* HEAD CONTENT START */}
                                            <div className="generic_head_content clearfix">
                                                <div className="head_bg"></div>
                                                <div className="head">
                                                    <span>{sub.nom}</span>
                                                </div>
                                            </div>
                                            {/* HEAD CONTENT END */}
                                            
                                            {/* PRICE START */}
                                            <div className="generic_price_tag clearfix">	
                                                <span className="price">
                                                    <span className="sign">Ariary</span>
                                                    <span className="currency">{sub.prix.toString().slice(0, -3)}</span>
                                                    <span className="cent">{sub.prix.toString().slice(-3)}</span>
                                                    <span className="month">/mois</span>
                                                </span>
                                            </div>
                                            {/* <!--//PRICE END--> */}
                                            
                                        </div>                            
                                        {/* <!--//HEAD PRICE DETAIL END--> */}
                                        
                                        {/* <!--FEATURE LIST START--> */}
                                        <div className="generic_feature_list">
                                            <ul>
                                                {/* <!-- <li><span>2GB</span>{sub.descri}</li>--> */}
                                                <li><span>150GB</span> Storage</li>
                                                <li><span>12</span> Accounts</li>
                                                <li><span>7</span> Host Domain</li>
                                                <li><span>24/7</span> Support</li>
                                            </ul>
                                        </div>
                                        {/* <!--//FEATURE LIST END--> */}
                                        
                                        {/* <!--BUTTON START--> */}
                                        <div className="generic_price_btn clearfix">
                                        {subscriptionActive && subscriptionActive.id_abo == sub.id ? <a className="btn-subscribe" style={{cursor: "default"}}>En cours</a> : <a className="btn-subscribe" style={{cursor: "pointer"}} onClick={() => subscribe(sub)}>S'abonner</a>}
                                            
                                        </div>
                                        {/* <!--//BUTTON END--> */}
                                        
                                    </div>
                                    {/* <!--//PRICE CONTENT END--> */}
                                        
                                </div>
                                )
                            })}
                            
                            {/* <div className="col-md-4">
                            
                                <div className="generic_content active clearfix">                                    
                                </div>
                                    
                            </div> */}
                        </div>	
                        {/* <!--//BLOCK ROW END--> */}
                        
                </section>
            </div>
        </>
    );
}
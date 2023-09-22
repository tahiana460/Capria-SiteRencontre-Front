import React, { useEffect, useState } from 'react';
import api from '../const/api';

export default function Accueil_component() {
    const [user, setUser] = useState();
    const [profils, setProfils] = useState([]);
    const [tableauAge, setTableauAge] = useState([]);
    const [filtres, setFiltres] =useState([]);

    const [nameSearch, setNameSearch] = useState('');

    const [genderFilter, setGenderFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');

    useEffect(() => {
        const userr = JSON.parse(localStorage.getItem("user"))[0]
        setUser(userr);


        // FILTRE AGE
        var ageList = tableauAge;
        ageList.push(18+'ans-'+25+'ans');
        ageList.push(25+'ans-'+30+'ans');
        for(let i=30;i<60;i+=10){
            var ag=i+'ans-'+(i+10)+'ans';
            ageList.push(ag);
            setTableauAge(ageList);
        }

        // GET PROFILS AUTRES USERS
        var obj={'id':userr.id,'filtres':filtres}
		const jsonString = JSON.stringify(obj);

        var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
      	myHeaders.append("Accept", "application/json");

        fetch(api("userList"), {
            headers: myHeaders,
            method:'POST',
            body:jsonString
        }).then((res) => {
            res.json().then((res) => {
                setProfils(res);
            })
        })
    }, []);

    const updateUserList = (filtres) => {
        const userr = JSON.parse(localStorage.getItem("user"))[0];
        var obj={'id':userr.id,'filtres':filtres}
		const jsonString = JSON.stringify(obj);

        var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
      	myHeaders.append("Accept", "application/json");

        fetch(api("userList"), {
            headers: myHeaders,
            method:'POST',
            body:jsonString
        }).then((res) => {
            res.json().then((res) => {
                setProfils(res);
            })
        })
    }

    useEffect(() => {
        var filtreTemp = [];
            // try{
                if(genderFilter!='' || ageFilter!=''){
                    filtreTemp.push(1);
                    const genre=genderFilter;
                    filtreTemp.push(genre);
                    var ageFiltre=ageFilter;
                    if(ageFiltre=='Tous'){
                        setFiltres(filtreTemp.push(''));
                    }else if(ageFiltre=='60'){
                        setFiltres(filtreTemp.push('60'));
                    }else{
                        ageFiltre=String(ageFiltre)
                        var ages=ageFiltre?.toString().split('-')
                        ages.map(age => {
                            filtreTemp.push(age.toString().split('ans')[0]);
                        });
                        setFiltres(filtreTemp)
                    }
                    updateUserList(filtreTemp);
                }else if(nameSearch!=''){
                    filtreTemp.push(0);
                    const nom=nameSearch;
                    filtreTemp.push(nom);
                    setFiltres(filtreTemp);
                    updateUserList(filtreTemp);
                } else {
                    // console.log('nandalo teeeeeeeeeeeto veeeee?');
                    setFiltres(filtreTemp);
                    updateUserList(filtreTemp);
                }
        console.log(filtreTemp);
    }, [nameSearch, genderFilter, ageFilter])

    const search = (e) => {
        e.preventDefault();

        // RECHERCHER
        var filtreTemp = [];
            // try{
                if(genderFilter!='' || ageFilter!=''){
                    filtreTemp.push(1);
                    const genre=genderFilter;
                    filtreTemp.push(genre);
                    var ageFiltre=ageFilter;
                    if(ageFiltre=='Tous'){
                        setFiltres(filtreTemp.push(''));
                    }else if(ageFiltre=='60'){
                        setFiltres(filtreTemp.push('60'));
                    }else{
                        ageFiltre=String(ageFiltre)
                        var ages=ageFiltre?.toString().split('-')
                        ages.map(age => {
                            filtreTemp.push(age.toString().split('ans')[0]);
                        });
                        setFiltres(filtreTemp)
                    }
                    updateUserList(filtreTemp);
                }else if(nameSearch!=''){
                    filtreTemp.push(0);
                    const nom=nameSearch;
                    filtreTemp.push(nom);
                    setFiltres(filtreTemp);
                    updateUserList(filtreTemp);
                } else {
                    // console.log('nandalo teeeeeeeeeeeto veeeee?');
                    setFiltres(filtreTemp);
                    updateUserList(filtreTemp);
                }
        console.log(filtreTemp);
            // }catch(error){
            //     console.log(error)
            // }
    }

    return (
        <>
                {/* <!-- Product --> */}
                {/* <!--<section className="bg0 p-t-23 p-b-140">--> */}
                <section className="bg0 p-t-80 p-b-50">
                    <div className="container">
                        <div className="p-b-10">
                            <h3 className="ltext-103 cl5">
                                Suggestions
                            </h3>
                        </div>

                        <div className="flex-w flex-sb-m p-b-52">
                            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                                
                            </div>

                            <div className="flex-w flex-c-m m-tb-10">
                                <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn1 trans-04 m-r-8 m-tb-4 js-show-filter">
                                    <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                                    <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                    Filtre
                                </div>

                                <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn1 trans-04 m-tb-4 js-show-search">
                                    <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                                    <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                    Search
                                </div>
                            </div>
                            
                            
                            <div className="dis-none panel-search w-full p-t-10 p-b-15">
                                <div className="bor8 dis-flex p-l-15">
                                <form onSubmit={search} >
                                    <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                                        <i className="zmdi zmdi-search"></i>
                                    </button>

                                    <input className="mtext-107 cl2 size-114 plh2 p-r-15" onChange={(e) => {setNameSearch(e.target.value)}} type="text" name="nom" placeholder="Search" />
                                </form>
                                </div>
                            </div>

                            <div className="dis-none panel-filter w-full p-t-10">
                                <form onSubmit={(e) => {search(e)}} >
                                <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">						

                                    <div className="filter-col1 p-r-15 p-b-27">
                                        <div className="mtext-102 cl2 p-b-15">
                                            Genre
                                        </div>

                                        <ul>
                                            <li className="p-b-6">
                                                <div className="form-check">
                                                    <input className="form-check-input filter-link-active" onChange={(e) => {setGenderFilter(e.target.value)}} type="radio" name="genre" id="allGender"
                                                    value="" checked={genderFilter == ''} />
                                                    <label className="form-check-label" htmlFor="allGender">
                                                        Tous
                                                    </label>
                                                </div>
                                            </li>

                                            <li className="p-b-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" onChange={(e) => {setGenderFilter(e.target.value)}} type="radio" name="genre" id="genderM" 
                                                    value="H" checked={genderFilter == 'H'} />
                                                    <label className="form-check-label" htmlFor="genderM">
                                                        Homme
                                                    </label>
                                                </div>
                                            </li>

                                            <li className="p-b-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" onChange={(e) => {setGenderFilter(e.target.value)}} type="radio" name="genre" id="genderF" 
                                                    value="F" checked={genderFilter == 'F'} />
                                                    <label className="form-check-label" htmlFor="genderF">
                                                        Femme
                                                    </label>
                                                </div>
                                            </li>								
                                        </ul>
                                    </div>

                                    <div className="filter-col2 p-r-15 p-b-27">
                                        <div className="mtext-102 cl2 p-b-15">
                                            Age
                                        </div>

                                        <ul>
                                            <li  className="p-b-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" onChange={(e) => {setAgeFilter(e.target.value)}} type="radio" name="age" id="allAge" 
                                                    value="" checked={ageFilter == ''} />
                                                    <label className="form-check-label" htmlFor="allAge">
                                                        Tous
                                                    </label>
                                                </div>
                                            </li>
                                            {tableauAge.map((ages, key)=>(
                                                <li key={key} className="p-b-6"  >
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" onChange={(e) => {setAgeFilter(e.target.value)}} name="age" id={"age"+key} 
                                                        value={ages} checked={ageFilter == ages} />
                                                        <label className="form-check-label" htmlFor={"age"+key} >
                                                            {ages}
                                                        </label>
                                                    </div>
                                                </li>
                                            ))}

                                            <li className="p-b-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" onChange={(e) => {setAgeFilter(e.target.value)}} name="age" id="agePlus" 
                                                    value="60" />
                                                    <label className="form-check-label" htmlFor="agePlus">
                                                        60ans+
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                {/* <div className="row" >
                                    <div className="col-md-3" ></div>
                                    <button className="flex-c-m stext-101 cl0  bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer" 
                                        style={{width:"50%", height:"50px"}} >
                                        Rechercher
                                    </button>
                                </div>	 */}
                                </form>
                            </div>
                        </div>

                        <div className="row isotope-grid">
                            {profils && profils.map((profil, key)=>(
                                <div key={key} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                                    <div className="block2">
                                        <div className="block2-pic hov-img0 block-img " style={{width: "auto", height: "270px"}} >
                                            <img  src={profil.photoDeProfil} alt="IMG-PRODUCT"   />

                                            <a href={'chat?id='+profil.id} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                                                Chat
                                            </a>
                                        </div>

                                        <div className="block2-txt flex-w flex-t p-t-14">
                                            <div className="block2-txt-child1 flex-col-l ">
                                                <a href={'/profile?id='+profil.id} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                    {profil.pseudo} 
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            

                        </div>

                        
                    </div>
                </section>
        </>
    );
}
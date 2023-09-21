import {useEffect,useState} from 'react'

export default function getItem(item) {
    var valeur=''
    if(typeof window!=undefined){
        console.log(window.localStorage.getItem(item))
    }
    return valeur
}
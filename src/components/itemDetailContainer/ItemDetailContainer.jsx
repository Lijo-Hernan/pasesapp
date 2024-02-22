import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../itemDetail/ItemDetail';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'

const ItemDetailContainer = () => {

    const [eq, seteq]= useState (null); 

    const {ideq} = useParams()

    useEffect (()=> {
        const fetchEquipos = collection(db, "equipos");
        getDocs (fetchEquipos)
        .then ((resp)=> {
            seteq (
                resp.docs.map ((doc) =>{
                    return {...doc.data() , id: doc.id}
                })
            )
        }) 
    },[ideq])
    

    return (
        <div>
            <div className='detailContainer'>
            <section className='detailContainer__card'>
                {eq ? <ItemDetail eq={eq}/> 
                : <h3>Cargando...</h3>}
            </section>
        </div>
            
        </div>
    );
};

export default ItemDetailContainer;
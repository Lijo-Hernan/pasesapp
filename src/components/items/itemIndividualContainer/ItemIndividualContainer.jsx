import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'
import Loader from '../../loader/Loader';
import ItemIndividual from '../itemIndividual/ItemIndividual';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './itemIndividualContainer.module.css'

const itemIndividualContainer = () => {

    const {id} = useParams();

    const [eq, setEq]= useState (null); 

    useEffect (()=> {
        const fetchEquipo = doc(db, "equipos",id);
        getDoc (fetchEquipo)
        .then ((resp)=> {
            setEq({...resp.data(), id: resp.id})
        }) 
    },[id])

    return (
        <div>
            <div className={classes.detailContainer}>
            <section className={classes.detailContainer__card}>
                {eq ? <ItemIndividual eq={eq}/> 
                : <div className={classes.container}><span className={classes.loader}><Loader/></span></div> }
            </section>
        </div>
            
        </div>
    );

};

export default itemIndividualContainer;
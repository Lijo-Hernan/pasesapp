import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import classes from './controlListContainer.module.css'
import Loader from '../../loader/Loader'
import ControlList from '../controlList/ControlList';
import ControlNav from '../controlNav/ControlNav';

const ControlListContainer = ({introduccion}) => {

    const [reportes, setReportes]= useState ([]);

    const { insumo } = useParams()

    useEffect(() => {
        const fetchReportes = async () => {
            const querySnapshot = await getDocs(collection(db, 'stockActual'));
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setReportes(data);
        };
        fetchReportes();
    }, []);

    const repFiltrado = (insumo !=undefined)? reportes.filter(reporte => reporte.nombre === insumo) : reportes


    return (
        <div className={classes.container}>
            <ControlNav/>
            <h2><u>{introduccion}</u></h2>
            {/* {(insumo!=undefined)?
            <div className={classes.container__card}>
                <section className={classes.cards}>{reportes.length === 0 ? <Loader/> : <ControlList reportes={repFiltrado}/>}</section>
                <section className={classes.prom}><h2>div promedio</h2></section>
            </div>
            :
            <section className={classes.container__card}>{reportes.length === 0 ? <Loader/> : <ControlList reportes={repFiltrado}/>}</section>} */}
            <section className={classes.cards}>{reportes.length === 0 ? <Loader/> : <ControlList reportes={repFiltrado}/>}</section>
        </div>
    );
};

export default ControlListContainer;
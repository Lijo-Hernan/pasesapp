import React from 'react';
import Item from '../item/Item';
import classes from './itemList.module.css'
import { Link } from 'react-router-dom';
import StockListContainer from '../../stock/stockListContainer/StockListContainer';

const itemList = ({equipos}) => {

    const adv= <img className={classes.imagenAdv} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/warning.png?alt=media&token=88a75a30-3ab7-4a41-9796-f7afd88b7c7c' 
    alt='warning' />

    let estado

    const tomo = equipos.find(equipo=> equipo.nombre=== "Tomógrafo")

    let formattedDate = "Sin fecha de reinicio";

    if (tomo.reinicio && tomo.reinicio.seconds) {
        const date = new Date(tomo.reinicio.seconds * 1000);
        formattedDate = date.toLocaleString();

        const currentDate = new Date();
    
        // Calcula la diferencia en milisegundos
        const timeDifference = currentDate - date;
    
        // Convierte la diferencia de milisegundos a horas
        const hoursDifference = timeDifference / (1000 * 60 * 60);
    
        if (hoursDifference >= 20) {
            estado = <span className={classes.reinicio__container}>
                    {adv}
                    <p className={classes.reinicio__p}>Ultimo reinicio del Tomógrafo: {formattedDate} ¡Por favor reiniciar!</p>
                    {adv}
                    </span>
            console.log("Ya pasaron mas de 24h");
        } else {
            estado = <span className={classes.reinicio__container}>
                    <p className={classes.reinicio__p}>Ultimo reinicio del Tomógrafo: {formattedDate} </p>
                    </span>
            console.log("Aún no han pasado 24 horas");
        }
    }



    return (
        <div className={classes.listContainer}>
        <section className={classes.cardContainer} >
            {equipos.map((equipo)=> (
                <Item 
                    key = {equipo.id}
                    equipo ={equipo}
                />
            ))}
            <span className={classes.historial__container}>
            <Link to='/historial' className={classes.historial}>
                <article className={classes.historial__card}>
                    <img src="../public/data/ctIco.jpg" alt="Historial" className={classes.historial__img}/>
                </article>
            </Link>
                <p className={classes.historial__p}>Historial de Reportes</p>
            </span>
        </section>
        {estado}
        {/* <span className={classes.reinicio__container}>
        <p className={classes.reinicio__p}>Ultimo reinicio del Tomógrafo: {formattedDate}</p>
        </span> */}
        <StockListContainer/>
        </div>
    );
};

export default itemList;
import React from 'react';
import Item from '../item/Item';
import classes from './itemList.module.css'
import { Link } from 'react-router-dom';
import StockListContainer from '../../stock/stockListContainer/StockListContainer';

const itemList = ({equipos}) => {

    const adv= <img className={classes.imagenAdv} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/warning.png?alt=media&token=da3b9ad8-5ddd-4335-a2e6-2508644b0673' 
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
                    <img src="https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/ReporteSinFondo.png?alt=media&token=6746ff34-8100-4de2-9d36-bf8ef9a49ea2" 
                    alt="Historial" className={classes.historial__img}/>
                </article>
            </Link>
                <p className={classes.historial__p}>Historial de Reportes</p>
            </span>
            <span className={classes.historial__container}>
            <Link to='/controlStock/Contraste Endovenoso' className={classes.historial}>
                <article className={classes.historial__card}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/ReporteSinFondo.png?alt=media&token=6746ff34-8100-4de2-9d36-bf8ef9a49ea2" 
                    alt="Consumos" className={classes.historial__img}/>
                </article>
            </Link>
                <p className={classes.historial__p}>Consumos de Stock</p>
            </span>
        </section>
        {estado}
        <StockListContainer/>
        </div>
    );
};

export default itemList;
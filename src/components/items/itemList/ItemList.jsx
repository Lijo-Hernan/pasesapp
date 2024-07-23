import React from 'react';
import Item from '../item/Item';
import classes from './itemList.module.css'
import { Link } from 'react-router-dom';
import StockListContainer from '../../stock/stockListContainer/StockListContainer';

const itemList = ({equipos}) => {
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
        <StockListContainer/>
        </div>
    );
};

export default itemList;
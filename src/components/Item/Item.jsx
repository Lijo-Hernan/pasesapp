import React from 'react';
import './item.css'
import { Link } from 'react-router-dom';

const Item = ({equipo}) => {

    let estado;

    if (equipo.Reporte === "") {
        estado = <img className='estado' src='../public/data/checkMark.png' alt='checkMark' />;
    }else {
        estado = <img className='estado' src='../public/data/xMArk.png' alt='xMArk' />;
    }


    return (
    <>
        <article className='item__card'>
            <h2 className='item__titulo'>{equipo.nombre}</h2>
            <button className='item__boton'>Reportar un problema</button>
            <p className='item__p'>Fecha de reinicio:{equipo.reinicio}</p>
            <p className='item__p'>Tècnico:{equipo.tecnico}</p>
            <span className='item__estado'>{estado}</span>
            <button className='item__boton2'>Reportar reincio</button>
        </article>
    </>
    );
};

export default Item;
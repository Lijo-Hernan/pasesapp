import React from 'react';
import './item.css'
import ItemReporte from '../itemReporte/ItemReporte';
import { Link } from 'react-router-dom';

const Item = ({equipo}) => {

    let estado;

    if (equipo.reporte === "") {
        estado = <img className='estado' src='../public/data/checkMark.png' alt='checkMark' />;
    }else {
        estado = <img className='estado' src='../public/data/xMArk.png' alt='xMArk' />;
    }


    return (
    <>
        <article className='item__card'>
            <h2 className='item__titulo'>{equipo.nombre}</h2>
                {equipo.reporte === "" ?
                    <div className='item__inner'>
                        <button className='item__boton'>Reportar un problema</button>
                        <span className='item__span'>
                            <p className='item__p'>Fecha de reinicio: {equipo.reinicio}</p>
                            <p className='item__p'>Tècnico: {equipo.tecnico}</p>
                        </span>
                        <button className='item__boton2'>Reportar reincio</button>
                    </div>
                : <ItemReporte equipo={equipo}/>}
            <span className='item__estado'>{estado}</span>
        </article>
    </>
    );
};

export default Item;
import React from 'react';
import './itemReporte.css'

const ItemReporte = ({equipo}) => {
    return (
        <div className='reporte'>
            <p className='reporte__p'>Fecha de reporte: {equipo.reporte}</p>
            <p className='reporte__p'>Numero de caso: {equipo.caso}</p>
            <p className='reporte__p'>Descripcion: {equipo.descripcion}</p>
            <button className='item__boton'>Finalizar caso</button>
        </div>
    );
};

export default ItemReporte;
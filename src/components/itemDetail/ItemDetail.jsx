import React from 'react';
import './itemDetail.css'

const ItemDetail = ({eq}) => {


    return (

        <div className='item__card detail__card'>
                <h2 className='item__titulo'>Reporte de falla para {eq.nombre}</h2>
            <div className='seccionDatos'>
            <form action="" className='form'>
                <span>
                    <label htmlFor="fecha">Fecha: </label>
                    <input type="date" id='fecha'/></span>
                <span>
                    <label htmlFor="caso">Numbero de caso: </label>
                    <input type="text" id='caso'/></span>
                <span>
                    <label htmlFor="descripcion">Descripciòn: </label>
                    <textarea id='descripcion' /></span>
                <span>
                    <label htmlFor="apellido">Apellido: </label>
                    <input type="text" id='apellido' /></span>
                <span>
                    <label htmlFor="clave">Codigo personal: </label>
                    <input type="password" name="clave" id="clave" />
                </span>
                <button type='submit' className='datos__boton'>Enviar</button>
            </form>
            <section className='datosServicio'>
                <h2 className='datos__titulo'>Datos del eqiupo relevantes para solicitar servicio</h2>
                <p className='datos__p'>Telefono de servicio tecnico: {eq.telefono}</p>
                <p className='datos__p'>Número de serie: {eq.serie}</p>
            </section>
            </div>
        </div>

    );
};

export default ItemDetail;
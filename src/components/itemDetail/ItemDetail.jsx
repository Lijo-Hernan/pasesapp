import React from 'react';

const ItemDetail = ({eq}) => {


    return (
        <div className='container'>
            <section className='item__card'>
            <h2 className='item__titulo'>Reporte de falla para {eq.nombre}</h2>
            </section>
        </div>
    );
};

export default ItemDetail;
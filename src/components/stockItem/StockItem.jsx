import React from 'react';


const Item = ({stock}) => {

    let imagenPAraMostrar;

    if (stock.stock < stock.minimo) {
        imagenPAraMostrar = <img className='imagenParaMostrar' src='../public/data/cleanX.png' alt='cleanX' />;
    } else if (stock.stock >= stock.maximo) {
        imagenPAraMostrar = <img className='imagenParaMostrar' src='../public/data/cleanCheck.png' alt='cleanCheck' />;
    }else {
        imagenPAraMostrar = <img className='imagenParaMostrar' src='../public/data/warning.png' alt='warning' />;
    }


    return (
    <>
        <article className='stockItem__card'>
            <p className='stockItem__titulo'>{stock.nombre} : <span className='stockNumber'>{stock.stock}</span>  {stock.presentacion} 
            {imagenPAraMostrar} 
            </p>
        </article>
    </>
    );
};

export default Item;
import React from 'react';
import './item.css'
import { Link } from 'react-router-dom';

const Item = ({equipo}) => {


    return (
    <>
        <article className='item__card'>
            <h2 className='item__titulo'>{equipo.nombre}</h2>
        </article>
    </>
    );
};

export default Item;
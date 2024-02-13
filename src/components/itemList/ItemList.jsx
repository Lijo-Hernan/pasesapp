import React from 'react';
import Item from '../Item/Item';
import './itemList.css'

const ItemList = ({equipos}) => {

    return (
        <section className='listContainer'>
            {equipos.map((equipo)=> (
                <Item 
                    key = {equipo.id}
                    equipo ={equipo}
                />
            ))}
        </section>
    );
};

export default ItemList;
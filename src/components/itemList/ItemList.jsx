import React from 'react';
import Item from '../Item/Item';
import './itemList.css'
import StockListCointainer from '../stockListContainer/StockListContainer'

const ItemList = ({equipos}) => {

    return (
        <section className='listContainer'>
            {equipos.map((equipo)=> (
                <Item 
                    key = {equipo.id}
                    equipo ={equipo}
                />
            ))}
            <StockListCointainer/>
        </section>
    );
};

export default ItemList;
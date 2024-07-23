import React from 'react';
import StockItem from '../stockItem/StockItem'
import classes from './stockList.module.css'

const ItemList = ({stocks}) => {

    return (
        <section className={classes.list}>
            {stocks.map((stock)=> (
                <StockItem 
                    key = {stock.id}
                    stock ={{...stock}}
                />
            ))}
        </section>
    );
};

export default ItemList;
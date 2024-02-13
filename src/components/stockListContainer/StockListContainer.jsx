import React, {useState,useEffect} from 'react';
import './stockListContainer.css'
import StockList from '../stockList/StockList'

const StockListContainer = () => {

    const [stocks, setstocks]= useState ([]); 

    useEffect (()=> {

        setTimeout (()=>{
                const fetchstocks = ()=> {
                fetch("./public/data/stock.json") 
                .then ((response) => response.json())
                .then ((data)=> setstocks(data))
                .catch ((error)=> console.log(error))
            }
            fetchstocks()
        }, 3000)
    },[])
    
    return (
        <div className='stockContainer'>
            <h1 className='stockContainer__intro'>Control de Stock</h1>
            <div className='stockCcontainer__card'>
                {stocks.length == 0 ? <h3>Cargando...</h3> 
                : 
                <StockList stocks={stocks}/>}
            </div>
        </div>
    );
};

export default StockListContainer;
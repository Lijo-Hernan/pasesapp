import React, {useState,useEffect} from 'react';
import './stockListContainer.css'
import StockList from '../stockList/StockList'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'

const StockListContainer = () => {

    const [stocks, setStocks]= useState ([]); 

    useEffect (()=> {

        const fetchStock = collection(db, "stock");
        getDocs (fetchStock)
        .then ((resp)=> {
            setStocks (
                resp.docs.map ((doc) =>{
                    return {...doc.data() , id: doc.id}
                })
            )
        }) 
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
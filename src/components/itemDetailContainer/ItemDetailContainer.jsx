import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../itemDetail/ItemDetail';
import Error from '../error/Error';

const ItemDetailContainer = () => {

    const [eq, seteq]= useState (null); 

    const {ideq} = useParams()

    useEffect (()=> {

            const fetchData = ()=> {
                fetch("/data/equipos.json") 
                .then ((response) => response.json())
                .then ((data)=>{ 
                    const eqEncontrado = data.find ((item) => item.id == "1")
                    seteq(eqEncontrado)
                })
                .catch ((error)=> console.log(error))
            }
            fetchData()
    },[ideq])

    return (
        <div>
            <div className='detailContainer'>
            <section className='detailContainer__card'>
                {eq ? <ItemDetail eq={eq}/> 
                : <Error/>}
            </section>
        </div>
            
        </div>
    );
};

export default ItemDetailContainer;
import React, {useState,useEffect} from 'react';
import ItemList from '../itemList/ItemList';

const ItemListContainer = () => {

    const [equipos, setequipos]= useState ([]); 

    useEffect (()=> {

        setTimeout (()=>{
        const fetchEquipos = ()=> {
                fetch("./public/data/equipos.json") 
                .then ((response) => response.json())
                .then ((data)=> setequipos(data))
                .catch ((error)=> console.log(error))
            }
            fetchEquipos()
            }, 1000)
    },[])
    
    return (
        <div className='container'>
            <div className='container__card'>
                {equipos.length == 0 ? <h3>Cargando...</h3> 
                : 
                <ItemList equipos={equipos}/>}
            </div>
        </div>
    );
};

export default ItemListContainer;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc, updateDoc, Timestamp, collection, addDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'
import Loader from '../../loader/Loader';
import classes from './stockModifier.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import { useAuth } from '../../../context/authContext';

const StockModifier = () => {
    const [stockItem, setStockItem]= useState(null)

    const auth = useAuth();

    const {idStock} = useParams();

    const {register, handleSubmit } = useForm();

    const productDoc = doc(db, 'stock', idStock)

    const actualizacion =collection (db,'stockActual')

    let entrada = false

    useEffect (()=>{

        getDoc(productDoc)
            .then(queryDocumentSnapshot => {
                if (queryDocumentSnapshot.exists && queryDocumentSnapshot.data()){
                const data = queryDocumentSnapshot.data()
                const adaptProd = {id: queryDocumentSnapshot.id, ...data}
                setStockItem(adaptProd)
            } else{setError(true)}
        })
            .catch(() => {
                console.log('error')
            })

    },[idStock])

    let nombreParaMostrar

    if (auth.usuario.displayName) {
        nombreParaMostrar=auth.usuario.displayName
    }else {
        nombreParaMostrar=auth.usuario.email
    } 

    const stockActual = async(data) => {

        const numero = parseInt(data.stock, 10);

        if (numero >= stockItem.stock) {
                entrada = true
        }

        Swal.fire({
            title: `Stock de ${stockItem.nombre} actualizado`,
            text: 'Por favor verifique el cambio en la lista',
            icon: 'success',
            confirmButtonText: 'Cerrar',
            background: 'green',
            color: 'white',
            width:'25em',
            didOpen: () => {
            Swal.getConfirmButton().disabled = true;
            setTimeout(() => {
            Swal.getConfirmButton().disabled = false;
            }, 1500);},
            confirmButtonColor:'red'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/'
            }})

        if ( data.stock != stockItem.stock){
        await addDoc (actualizacion, {stock:numero, fecha:Timestamp.fromDate(new Date()), Apellido:data.apellido, logStock: nombreParaMostrar, nombre: stockItem.nombre, entrada:entrada});
        await updateDoc (productDoc, {stock:numero, fecha:Timestamp.fromDate(new Date()), Apellido:data.apellido, logStock: nombreParaMostrar});
        }
    }
    
    return (
        <div className={classes.stockContainer} >  
            {stockItem === null ? <Loader/> 
            : 
            <section>     
                <h2>Modifique el valor al stock actual de {stockItem.nombre}</h2>
                <h3>en cantidad de {stockItem.presentacion}</h3>
                    <form onSubmit={handleSubmit(stockActual)}>
                        <article className={classes.form__data}>
                            <label htmlFor="stock">Nuevo Stock:{" "}
                                <input type="number" id="stock" min="0" required placeholder={`Valor actual: ${stockItem.stock}`} autoComplete="on"{...register("stock")}/>
                            </label>
                            <label htmlFor="apellido">Apellido:{" "}
                                <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                            </label>
                        </article>
                        <article className={classes.form__btn}>
                            <button className="btn btn-success btn-lg">Actualizar</button> 
                        </article>
                    </form> 
            </section>}
        </div>
    );
};

export default StockModifier;
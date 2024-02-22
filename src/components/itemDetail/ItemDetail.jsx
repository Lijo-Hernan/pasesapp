import React, {useState} from 'react';
import './itemDetail.css';
import {useForm} from "react-hook-form";
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'

const ItemDetail = ({eq}) => {

        const [apellido, setApellido] = useState('');
    
        const handleChange = (event) => {
            const textoMayusculas = event.target.value.toUpperCase();
            setApellido(textoMayusculas);
        };


    const {register, formState:{errors}, handleSubmit, watch} = useForm();


    const reportado = watch('pregunta')

    const onSubmit = (datos)=> {
        const reporte =collection (db,'reportes')
        addDoc (reporte, datos);
        alert("Reporte enviado correctamente, muchas gracias" )
    }


    return (

        <div className='item__card detail__card'>
                <h2 className='item__titulo'>Reporte de falla para {eq.nombre}</h2>
            <div className='seccionDatos'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <span>
                    <label htmlFor="fecha">Fecha: </label>
                    <input type="date" id='fecha' {...register('fecha', {required:true})}/>
                    {errors.fecha?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="descripcion">Descripciòn: </label>
                    <textarea id='descripcion' {...register('descripcion', {required:true})} />
                    {errors.descripcion?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="apellido">Apellido: </label>
                    <input type="text" id='apellido'{...register('apellido', {required:true})} value={apellido} onChange={handleChange} />
                    {errors.apellido?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="clave">Codigo personal: </label>
                    <input type="password" id='clave' {...register('clave', {required:true})} />
                    {errors.clave?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="pregunta">Se reporto a servicio tencnico?</label>
                    <input type="checkbox" id="pregunta" {...register ('pregunta')} />
                </span>
                {reportado && (
                <span>
                    <label htmlFor="caso">Numbero de caso: </label>
                    <input type="text" id='caso' {...register('caso')}/>
                </span>)}

                <button type='submit' className='datos__boton'>Enviar</button>
            </form>
            <section className='datosServicio'>
                <h2 className='datos__titulo'>Datos del eqiupo relevantes para solicitar servicio</h2>
                <p className='datos__p'>Telefono de servicio tecnico: {eq.telefono}</p>
                <p className='datos__p'>Número de serie: {eq.serie}</p>
            </section>
            </div>
        </div>

    );
};

export default ItemDetail;
import React from 'react';
import './validForm.css'

const ValidForm = () => {

    return (
        
    <div className='detailContainer'>
        <section className='item__card'>
                    <h2 className='item__titulo'>Valide su identidad</h2>
            <form className='valid__form'>
                <span>
                    <label htmlFor="Apellido">Apellido   </label>
                    <input type="text" id="Apellido" placeholder="Ingrese su apellido"/>
                </span>
                <span>
                    <label htmlFor="Password">Codigo Personal   </label>
                    <input type="password" id='Password' placeholder='ingrese su codigo'/>
                </span>
                <button type="submit" className='validar'>Validar</button>
            </form>
        </section>
    </div>
    );
};

export default ValidForm;
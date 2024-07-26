import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './item.module.css'
import { Link } from 'react-router-dom';

const Item = ({equipo}) => {

    let estado;

    if (equipo.descripcion === "") {
        estado = classes.item__cardOk
    }else {
        estado = classes.item__cardX
    }

    return (
    <>
        <div className={classes.cardContainer}>   
                <Link to={`estado/${equipo.id}`} className={classes.linkContainer}>
                    <article className={estado}>
                        <span className={classes.item__estado}>
                            <img className={classes.estado} src={equipo.img} alt={equipo.nombre} />
                        </span>
                    </article>
                    <h2 className={classes.nombre}>{equipo.nombre}</h2>
                </Link>
        </div>
    </>
    );
};

export default Item;

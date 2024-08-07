import React, {useState,useEffect} from 'react';
import Reinicio from '../reinicio/Reinicio';
import classes from './itemIndividual.module.css'
import { Link } from 'react-router-dom';
import { Offcanvas, Button } from 'react-bootstrap';
import ItemReporte from "../itemReporte/ItemReporte"

const itemIndividual = ({eq}) => {

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);


    let formattedDate = "Sin fecha de reinicio";

    if (eq.reinicio && eq.reinicio.seconds) {
        const date = new Date(eq.reinicio.seconds * 1000);
        formattedDate = date.toLocaleString();
    }

    let estado;

    if (eq.descripcion === "") {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/checkMark.png?alt=media&token=6146dce1-56c3-4eeb-9dc5-389099690f6d' 
        alt={eq.nombre} />;
    }else {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/xsinFondo.png?alt=media&token=8955479b-fd5e-4792-b7ba-8511e6b98361' 
        alt='xMArk' />;
    }

    return (
            <>
            <div className={classes.container}>
            <div className={classes.item__container}>
            <article className={classes.item__card}>
                    <h2 className={classes.nombre}>{eq.nombre}</h2>
                    <span className={classes.item__estado}>{estado}</span>
            </article>
                <div>
                    {eq.descripcion === "" ?
                        <div className={classes.item__inner}>
                            <span className={classes.item__span}>
                                <p className={classes.item__p}>Fecha de reinicio: {formattedDate}</p>
                                <p className={classes.item__p}>Técnico: {eq.tecnico}</p>
                            </span>
                            <span className={classes.botones}>
                                <Link to={`/reporte/${eq.id}`} className='btn btn-danger'>Reportar un problema</Link>
                                <Button variant="primary" onClick={handleShow}>
                                    Reportar Reinicio
                                </Button>
                                <Link to='/' className='btn btn-success'>Volver al inicio</Link>
                            </span>
                        </div>
                            : <ItemReporte equipo={eq}/>}
                    
                </div>
            </div>
            </div>

            <Offcanvas show={showOffcanvas} onHide={handleClose} className={classes.canvasBody}>
        
            <Offcanvas.Body>
        
                {eq &&  <Reinicio equipo={eq} onClick={handleClose} />}
        
            </Offcanvas.Body>
            </Offcanvas>
        </>
        );
};

export default itemIndividual;
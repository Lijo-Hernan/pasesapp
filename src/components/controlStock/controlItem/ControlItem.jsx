import 'bootstrap/dist/css/bootstrap.css';
import classes from './controlItem.module.css'


const ControlItem = ({reporte}) => {

    // let formattedDate = "Sin fecha de reporte";

    // if (reporte.fecha && reporte.fecha.seconds) {
    //     const date = new Date(reporte.fecha.seconds * 1000);
    //     formattedDate = date.toLocaleString();
    // }


    return (
        <article className={classes.item__card}>
        <h2 className={classes.item__titulo}>{reporte.nombre}</h2>
                <div className={classes.item__inner}>
                    <span className={classes.item__span}>
                        {/* <p className={classes.item__p}>Fecha de reporte: {formattedDate}</p> */}
                        <p className={classes.item__p}>Fecha de reporte: {reporte.fecha}</p>
                        <p className={classes.item__p}>Consumido: {reporte.consumido}</p>
                        {/* <p className={classes.item__p}>Técnico: {reporte.Apellido}</p> */}
                    </span>
                </div>
    </article>
    );
};

export default ControlItem;
import 'bootstrap/dist/css/bootstrap.css';
import classes from './controlItem.module.css'


const ControlItem = ({reporte}) => {

    const [year, month, day] = reporte.fecha.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <article className={classes.item__card}>
        <h2 className={classes.item__titulo}>{reporte.nombre}</h2>
                <div className={classes.item__inner}>
                    <span className={classes.item__span}>
                        <p className={classes.item__p}>Fecha de reporte: {formattedDate}</p>
                        <p className={classes.item__p}>Consumido: {reporte.consumido}</p>
                    </span>
                </div>
    </article>
    );
};

export default ControlItem;
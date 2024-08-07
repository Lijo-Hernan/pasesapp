import classes from './stockItem.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const Item = ({stock}) => {


    let imagenPAraMostrar;

    if (stock.stock < stock.minimo) {
        imagenPAraMostrar = <img className={classes.imagenParaMostrar} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/cleanX.png?alt=media&token=17d67980-4512-4e70-9ccb-d8c1ec5d385f' 
        alt='cleanX' />;
    } else if (stock.stock >= stock.maximo) {
        imagenPAraMostrar = <img className={classes.imagenParaMostrar} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/cleanCheck.png?alt=media&token=867e3377-f502-4bae-98c5-11a824f34a77' 
        alt='cleanCheck' />;
    }else {
        imagenPAraMostrar = <img className={classes.imagenParaMostrar} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/warning.png?alt=media&token=da3b9ad8-5ddd-4335-a2e6-2508644b0673' 
        alt='warning' />;
    }

    return (
    <>
        <article className={classes.stockItem__card}>
            <p className={classes.stockItem__titulo}>{stock.nombre} : <span className={classes.stockNumber}>{stock.stock}</span>{stock.presentacion} 
            {imagenPAraMostrar} 
            </p>
            <Link to={`stock/stockmodifier/${stock.id}`}  className={`btn btn-primary ${classes.boton}`}>Corregir</Link>
        </article>
    </>
    );
};

export default Item;
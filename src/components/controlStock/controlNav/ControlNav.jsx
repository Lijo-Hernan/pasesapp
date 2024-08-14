import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query} from 'firebase/firestore'
import { db } from '../../firebase/config'
import classes from './controlNav.module.css'

const controlNav = () => {

    const [categorias, setCategorias] = useState([])

    const navegar = useNavigate()

    useEffect(() => {
        const categoriesCollection = query(collection(db, 'stock'), orderBy('nombre'))
        
        getDocs(categoriesCollection)
            .then(querySnapshot => {
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data}
                })
                setCategorias(categoriesAdapted)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <header className={classes.header}>
            <span className={classes.header__cont}>
                <nav className={classes.nav}>
                    <div className={classes.navbar__list}>
                        <Link to={`/controlStock`} className={classes.navbar__btn}>Todos los insumos</Link>
                        {categorias.map(cat => {
                            return <Link key={cat.id} to={`/controlStock/${cat.nombre}`} className={classes.navbar__btn}>
                                    {cat.nombre}</Link>
                        })}
                        <Link to='/' className={classes.navbar__btn}>Volver al inicio</Link>
                    </div>
                </nav>
            </span>
        </header>
    );
};

export default controlNav;
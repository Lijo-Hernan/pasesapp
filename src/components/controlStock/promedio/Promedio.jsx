import React, {useState,useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import Loader from '../../loader/Loader';

const promedio = ({reportes}) => {

const nombre = reportes[0].nombre

const hoy = new Date();
const hace30Dias = new Date();
hace30Dias.setDate(hoy.getDate() - 30);

// Filtrar reportes de los últimos 30 días
const ultimos30Dias = reportes.filter(reporte => {
    const fechaReporte = new Date(reporte.fecha);
    return fechaReporte >= hace30Dias && fechaReporte <= hoy;
});

// Calcular la suma de lo consumido en esos días
const sumaConsumido = ultimos30Dias.reduce((acc, reporte) => acc + reporte.consumido, 0);

// Calcular el promedio
const promedioConsumido = sumaConsumido / ultimos30Dias.length;

const [item, setItem]= useState ([]);

useEffect(() => {
    const fetchReportes = async () => {
        const querySnapshot = await getDocs(collection(db, 'stock'));
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const dataFiltrada = data.filter(reporte => reporte.nombre === nombre);
        setItem(dataFiltrada);
    };
    fetchReportes();
}, [nombre]);


if (item.length === 0) {
    return <Loader/>; // Mostrar algo mientras los datos se cargan
}

const presentacion = item[0].presentacion
    return (
        <div>
            <h3>Promedio de consumo de los ultomos 30 días de {nombre} es:</h3>
            <h2>{promedioConsumido}  {presentacion}</h2>  
        </div>
    );
};

export default promedio;
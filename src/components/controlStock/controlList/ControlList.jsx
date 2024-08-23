import React from 'react';
import { useState } from 'react';
import classes from './controlList.module.css'
import ControlItem from '../controlItem/ControlItem';
import Promedio from '../promedio/Promedio'; 


const ControlList = ({reportes}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de reportes por página

// query a ver que sale!!

// Paso 1: Filtrar por hora
const reportesFiltrados = reportes.filter(reporte => {
    const timestamp = new Date(reporte.fecha.seconds * 1000); // Convertir segundos a milisegundos
    const hora = timestamp.getHours();
    return hora >= 9 || hora < 9; // Considerando las 9 AM de un día hasta las 9 AM del siguiente día
});

// Paso 2: Agrupar por día y por nombre
const reportesAgrupados = reportesFiltrados.reduce((acc, reporte) => {
    const timestamp = new Date(reporte.fecha.seconds * 1000); // Convertir segundos a milisegundos
    if (timestamp.getHours() < 9) {
        timestamp.setDate(timestamp.getDate() - 1); // Ajustar el día si está antes de las 9 AM
    }
    const dia = timestamp.toISOString().split('T')[0]; // Obtener solo la fecha (año-mes-día)
    const nombre = reporte.nombre;

    const key = `${dia}|${nombre}`; // Usar '|' como delimitador

    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(reporte);
    return acc;
}, {});

// Paso 3: Resumir reportes por día y por nombre
const reportesResumen = Object.keys(reportesAgrupados).map(key => {
    const reportesDelDiaYNombre = reportesAgrupados[key];
    const consumido = reportesDelDiaYNombre.reduce((acc, reporte) => {
        return reporte.entrada ? acc + reporte.stock : acc - reporte.stock;
    }, 0);
    const [fecha, nombre] = key.split('|'); // Separar fecha y nombre correctamente
    
    const uniqueKey = `${fecha}-${nombre}`; // Crear una key única combinando fecha y nombre
    
    return {
        key: uniqueKey,
        fecha,
        nombre,
        consumido,
        reportes: reportesDelDiaYNombre
    };
});

//////////////////

// const sortedReportes = reportes.sort((a, b) => b.fecha - a.fecha);
const sortedReportes = reportesResumen.sort((a, b) => b.fecha - a.fecha);

    // Calcular los índices de los reportes a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReportes = sortedReportes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reportes.length / itemsPerPage);
    
    // Cambiar de página
    const handleNextPage = () => {
        if (currentPage < Math.ceil(reportes.length / itemsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className={classes.controlList}>
            <div className={classes.control__container}>
                <div className={classes.botones}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(reportes.length / itemsPerPage)}>Siguiente</button>
                </div>
                <section className={classes.listContainer}>
                    {currentReportes.map(reporte => (
                        <ControlItem key={reporte.key} reporte={reporte} />
                    ))}
                </section>
            </div>
            <section className={classes.prom}><Promedio reportes={currentReportes} /></section>
        </div>
    );





    // const [reportesOrdenados, setReportesOrdenados] = useState(reportes);
    // useEffect(() => {
    //     const orderedReports = [...reportes].sort((a, b) => b.fecha - a.fecha );
    //     setReportesOrdenados(orderedReports);
    //     }, [reportes]);

    // return (
    //     <section className={classes.listContainer}>
    //         {reportesOrdenados.map((reporte)=> (
    //             <ControlItem 
    //                 key = {reporte.id}
    //                 reporte ={reporte}
    //             />
    //         ))}
    //     </section>
    // );
};

export default ControlList;
import React from 'react';
import { useState } from 'react';
import classes from './controlList.module.css'
import ControlItem from '../controlItem/ControlItem';
import Promedio from '../promedio/Promedio'; 


const ControlList = ({ reportes }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Paso 1: Filtrar por hora
    const reportesFiltrados = reportes.filter(reporte => {
        const timestamp = new Date(reporte.fecha.seconds * 1000);
        const hora = timestamp.getHours();
        // desde las 9 AM de un día hasta las 9 AM del siguiente día
        return (hora >= 9) || (hora < 9 && timestamp.getDate() !== new Date().getDate());
    });

    // Paso 2: Agrupar por día y por nombre
    const reportesAgrupados = reportesFiltrados.reduce((acc, reporte) => {
        const timestamp = new Date(reporte.fecha.seconds * 1000);
        
        // Ajustar la fecha para el corte a las 9 AM
        if (timestamp.getHours() < 9) {
            timestamp.setDate(timestamp.getDate() - 1); // Ajustar el día si está antes de las 9 AM
        }
        const dia = timestamp.toISOString().split('T')[0]; // Obtener solo la fecha (año-mes-día)
        const nombre = reporte.nombre;
        const key = `${dia}|${nombre}`;

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(reporte);
        return acc;
    }, {});

    // Paso 3: Resumir reportes por día y por nombre
    const reportesResumen = Object.keys(reportesAgrupados).map(key => {
        const reportesDelDiaYNombre = reportesAgrupados[key];
        const [fecha, nombre] = key.split('|'); // Separar fecha y nombre correctamente

        const fechaInicio = new Date(fecha);
        const fechaFin = new Date(fechaInicio);
        fechaFin.setDate(fechaInicio.getDate() + 1); // Siguiente día
        fechaFin.setHours(9, 0, 0, 0); // Fin del periodo a las 9 AM

        // Encontrar el último valor de stock con entrada=true
        const stockInicial = reportesDelDiaYNombre
            .filter(r => r.entrada)
            .map(r => r.stock)
            .pop() || 0;

        console.log(key, stockInicial);

        // Encontrar el último reporte con entrada=false dentro del periodo
        const reportesFalse = reportesDelDiaYNombre.filter(r => !r.entrada);
        const ultimoReporteFalse = reportesFalse.length > 0 ? reportesFalse[reportesFalse.length - 1] : null;

        // Calcular el consumo restando solo el último reporte con entrada=false del stock inicial
        const consumido = ultimoReporteFalse ? stockInicial - ultimoReporteFalse.stock : 0;

        const uniqueKey = `${fecha}-${nombre}`; // Crear una key única combinando fecha y nombre

        return {
            key: uniqueKey,
            fecha,
            nombre,
            consumido: Math.abs(consumido), // Convertir a valor absoluto si es necesario
            reportes: reportesDelDiaYNombre
        };
    });

    console.log(reportesResumen);

    // Ordenar por fecha (se asumió que fecha es una cadena ISO)
    const sortedReportes = reportesResumen.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Calcular los índices de los reportes a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReportes = sortedReportes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reportesResumen.length / itemsPerPage);

    // Cambiar de página
    const handleNextPage = () => {
        if (currentPage < totalPages) {
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
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
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
};

export default ControlList;





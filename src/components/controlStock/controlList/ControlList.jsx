import React from 'react';
import { useState } from 'react';
import classes from './controlList.module.css'
import ControlItem from '../controlItem/ControlItem';


const ControlList = ({reportes}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de reportes por página

    const sortedReportes = reportes.sort((a, b) => b.fecha - a.fecha);

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

        <div>
            <div className={classes.botones}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(reportes.length / itemsPerPage)}>Siguiente</button>
            </div>
            <section className={classes.listContainer}>
                {currentReportes.map(reporte => (
                    <ControlItem key={reporte.id} reporte={reporte} />
                ))}
            </section>
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
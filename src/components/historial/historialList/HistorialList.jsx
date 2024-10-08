import { useState, useEffect } from 'react';
import classes from './historialList.module.css'
import HistorialItem from '../hisptorialItem/HistorialItem'
import Loader from '../../loader/Loader'


const HistorialList = ({reportes}) => {


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    const sortedReportes = reportes.sort((a, b) => b.fecha - a.fecha);

    // Calcular los índices de los reportes a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReportes = sortedReportes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reportes.length / itemsPerPage);


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
                    <HistorialItem key={reporte.id} reporte={reporte} />
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
    //             <HistorialItem 
    //                 key = {reporte.id}
    //                 reporte ={reporte}
    //             />
    //         ))}
    //     </section>
    // );
};

export default HistorialList;
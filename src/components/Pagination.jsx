import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center gap-8 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-8 py-3 rounded-full font-bold tracking-widest transition-all btn-3d ${currentPage === 1
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-black text-vapor-pink border border-vapor-pink hover:bg-vapor-pink hover:text-black hover:shadow-[0_0_20px_rgba(255,42,109,0.5)]'
                    }`}
            >
                ANTERIOR
            </button>

            <span className="text-white font-black text-xl">
                PÁGINA <span className="text-vapor-cyan">{currentPage}</span>
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={totalPages && currentPage >= totalPages}
                className="px-8 py-3 rounded-full font-bold tracking-widest bg-black text-vapor-pink border border-vapor-pink hover:bg-vapor-pink hover:text-black hover:shadow-[0_0_20px_rgba(255,42,109,0.5)] transition-all btn-3d"
            >
                SIGUIENTE
            </button>
        </div>
    );
};

export default Pagination;

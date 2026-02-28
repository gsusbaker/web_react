import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPublishers } from '../services/service';
import Pagination from '../components/Pagination';

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        const fetchPublishers = async () => {
            setLoading(true);
            try {
                const data = await getPublishers(searchQuery, 20, page);
                setPublishers(data.results);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error("Error fetching publishers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublishers();
    }, [searchQuery, page]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage);
        setSearchParams(newParams);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set('search', value);
        } else {
            newParams.delete('search');
        }
        newParams.set('page', '1'); // Reset to page 1 on search
        setSearchParams(newParams);
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-4xl font-black text-white uppercase tracking-wider">
                    Distribuidores
                </h1>

                <div className="w-full md:max-w-xs relative">
                    <input
                        type="text"
                        placeholder="Buscar distribuidor..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-vapor-cyan transition-all"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vapor-purple shadow-[0_0_15px_rgba(125,95,255,0.5)]"></div>
                </div>
            ) : (
                <>
                    {publishers.length === 0 ? (
                        <p className="text-center text-gray-400 text-xl mt-12">No se encontraron distribuidores.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {publishers.map((pub) => (
                                    <Link
                                        key={pub.id}
                                        to={`/publisher/${pub.id}`}
                                        className="block bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 p-6 group hover:border-vapor-cyan hover:shadow-[0_0_20px_rgba(42,245,255,0.2)]"
                                    >
                                        <div className="h-32 mb-4 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                                            {pub.image_background ? (
                                                <img src={pub.image_background} alt={pub.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                            ) : (
                                                <span className="text-4xl">🏢</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-xl text-white group-hover:text-vapor-cyan transition-colors">{pub.name}</h3>
                                        <p className="text-gray-400 text-sm mt-2">{pub.games_count} videojuegos</p>
                                    </Link>
                                ))}
                            </div>

                            <Pagination
                                currentPage={page}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Publishers;

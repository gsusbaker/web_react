import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPopularGames, searchGames } from '../services/api';
import GameCard from '../components/GameCard';

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();

    // Get search term from URL query parameter 'search'
    const searchQuery = searchParams.get('search');

    useEffect(() => {
        // Reset page when search changes
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                let data;
                if (searchQuery) {
                    data = await searchGames(searchQuery, 20, page);
                } else {
                    data = await getPopularGames(20, page);
                }
                setGames(data.results);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [searchQuery, page]);

    const handlePrevious = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNext = () => {
        setPage(p => p + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <h1 className="text-4xl font-black mb-8 text-white uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {searchQuery ? `Resultados para "${searchQuery}"` : "Juegos Populares"}
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vapor-purple shadow-[0_0_15px_rgba(125,95,255,0.5)]"></div>
                </div>
            ) : (
                <>
                    {games.length === 0 ? (
                        <p className="text-center text-gray-400 text-xl mt-12">No se encontraron juegos en la base de datos.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-center items-center gap-8 mt-12">
                                <button
                                    onClick={handlePrevious}
                                    disabled={page === 1}
                                    className={`px-8 py-3 rounded-full font-bold tracking-widest transition-all btn-3d ${page === 1
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                                        : 'bg-black text-vapor-pink border border-vapor-pink hover:bg-vapor-pink hover:text-black hover:shadow-[0_0_20px_rgba(255,42,109,0.5)]'
                                        }`}
                                >
                                    ANTERIOR
                                </button>

                                <span className="text-white font-black text-xl">
                                    PÁGINA <span className="text-vapor-cyan">{page}</span>
                                </span>

                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 rounded-full font-bold tracking-widest bg-black text-vapor-pink border border-vapor-pink hover:bg-vapor-pink hover:text-black hover:shadow-[0_0_20px_rgba(255,42,109,0.5)] transition-all btn-3d"
                                >
                                    SIGUIENTE
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Games;

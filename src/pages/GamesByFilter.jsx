import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getGamesByFilter } from '../services/api';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const GamesByFilter = () => {
    const { type, slug } = useParams(); // type can be 'genres' or 'tags'
    const [searchParams, setSearchParams] = useSearchParams();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const page = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                // The API needs the slug/id for the specific filter
                const data = await getGamesByFilter(type, slug, 20, page);
                setGames(data.results);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error(`Error fetching games by ${type}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [type, slug, page]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage);
        setSearchParams(newParams);
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <Link to="/games" className="inline-block text-vapor-pink hover:text-white mb-6 uppercase font-bold tracking-widest transition-colors mb-8">
                ← Volver a Explorar
            </Link>

            <h1 className="text-4xl font-black mb-8 text-white uppercase tracking-wider">
                {type === 'genres' ? 'Género' : 'Tag'}: <span className="text-vapor-cyan">{slug.replace(/-/g, ' ')}</span>
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vapor-purple shadow-[0_0_15px_rgba(125,95,255,0.5)]"></div>
                </div>
            ) : (
                <>
                    {games.length === 0 ? (
                        <p className="text-center text-gray-400 text-xl mt-12">No se encontraron juegos para esta categoría.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
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

export default GamesByFilter;

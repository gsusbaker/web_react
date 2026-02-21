import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getPublisherDetails, getGamesByFilter } from '../services/api';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const PublisherDetail = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const page = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        const fetchPublisherData = async () => {
            setLoading(true);
            try {
                const pubData = await getPublisherDetails(id);
                setPublisher(pubData);

                const gamesData = await getGamesByFilter('publishers', id, 20, page);
                setGames(gamesData.results);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error("Error fetching publisher details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublisherData();
    }, [id, page]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage);
        setSearchParams(newParams);
    };

    if (loading && !publisher) {
        return <div className="text-center p-24 text-white">Cargando distribuidor...</div>;
    }

    if (!publisher) {
        return <div className="text-center p-24 text-white">Distribuidor no encontrado.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <Link to="/publishers" className="inline-block text-vapor-pink hover:text-white mb-6 uppercase font-bold tracking-widest transition-colors mb-8">
                ← Volver a Distribuidores
            </Link>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm">
                <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                    {publisher.name}
                </h1>
                <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: publisher.description }} />
            </div>

            <h2 className="text-3xl font-bold mb-8 text-white uppercase tracking-wider">
                Videojuegos de <span className="text-vapor-cyan">{publisher.name}</span>
            </h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vapor-purple shadow-[0_0_15px_rgba(125,95,255,0.5)]"></div>
                </div>
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
        </div>
    );
};

export default PublisherDetail;

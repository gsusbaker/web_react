import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularGames, searchGames } from '../store/slices/gamesSlice';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const Games = () => {
    const dispatch = useDispatch();
    const { popularGames, searchResults, loading, count } = useSelector((state) => state.games);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get parameters from URL
    const searchQuery = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page')) || 1;

    const games = searchQuery ? searchResults : popularGames;

    useEffect(() => {
        if (searchQuery) {
            dispatch(searchGames({ query: searchQuery, page_size: 20, page }));
        } else {
            dispatch(fetchPopularGames({ page_size: 20, page }));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [dispatch, searchQuery, page]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage);
        setSearchParams(newParams);
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

export default Games;

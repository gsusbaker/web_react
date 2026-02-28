import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as api from '../services/service';

const Favorites = () => {
    const { favorites } = useSelector((state) => state.user);
    const [favoriteGames, setFavoriteGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const games = await Promise.all(
                    favorites.map((id) => api.getGameDetails(id))
                );
                setFavoriteGames(games);
            } catch (error) {
                console.error("Error fetching favorite games:", error);
            } finally {
                setLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchFavorites();
        } else {
            setFavoriteGames([]);
            setLoading(false);
        }
    }, [favorites]);

    if (loading) return <div className="text-center py-20">Cargando favoritos...</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-vapor-pink to-vapor-blue">
                Mis Favoritos
            </h1>
            {favoriteGames.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-700">
                    <p className="text-xl text-gray-400 mb-6">Aún no tienes juegos favoritos.</p>
                    <Link to="/games" className="px-6 py-3 bg-vapor-pink rounded-lg font-bold hover:bg-vapor-pink/80 transition-all">
                        Explorar Juegos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {favoriteGames.map((game) => (
                        <Link key={game.id} to={`/game/${game.id}`} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-vapor-pink transition-all group">
                            <div className="h-48 overflow-hidden relative">
                                <img src={game.background_image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-sm font-bold text-yellow-400">
                                    ⭐ {game.rating}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold truncate">{game.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

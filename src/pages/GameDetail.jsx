import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameDetails } from '../services/api';

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const data = await getGameDetails(id);
                setGame(data);
            } catch (error) {
                console.error("Error loading game details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [id]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    if (loading) {
        return <div className="text-center p-10">Loading game data...</div>;
    }

    if (!game) {
        return <div className="text-center p-10">Game not found.</div>;
    }

    return (
        <div className="relative min-h-screen bg-vapor-bg overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-vapor-purple/20 rounded-full blur-[150px] opacity-30 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-vapor-pink/10 rounded-full blur-[150px] opacity-20"></div>
                {/* Optional: Overlay image from game */}
                <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${game.background_image})` }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
                <Link to="/games" className="inline-flex items-center gap-2 text-vapor-pink hover:text-white mb-8 font-bold tracking-widest uppercase transition-colors group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a Explorar
                </Link>

                <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                    {/* Left Column: Image & Actions */}
                    <div className="space-y-6">
                        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,42,109,0.2)] border border-white/10 group">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <button
                            onClick={toggleFavorite}
                            className={`w-full py-4 rounded-xl font-black tracking-widest text-lg transition-all btn-3d shadow-xl ${isFavorite
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                                    : 'bg-transparent border-2 border-vapor-purple text-vapor-purple hover:bg-vapor-purple hover:text-white hover:shadow-[0_0_20px_rgba(125,95,255,0.5)]'
                                }`}
                        >
                            {isFavorite ? '♥ ELIMINAR DE FAVORITOS' : '♡ AÑADIR A FAVORITOS'}
                        </button>
                    </div>

                    {/* Right Column: Details */}
                    <div>
                        <div className="flex flex-col gap-4 mb-6">
                            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-vapor-pink via-purple-500 to-vapor-cyan drop-shadow-[0_0_10px_rgba(255,42,109,0.3)]">
                                {game.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                {game.metacritic && (
                                    <span className={`px-4 py-1 rounded-full font-bold border backdrop-blur-sm ${game.metacritic >= 75 ? 'border-green-500 text-green-400 bg-green-500/10' :
                                        game.metacritic >= 50 ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' :
                                            'border-red-500 text-red-400 bg-red-500/10'
                                        }`}>
                                        METASCORE: {game.metacritic}
                                    </span>
                                )}
                                <span className="px-4 py-1 rounded-full border border-white/20 text-gray-300 bg-white/5">
                                    📅 {game.released}
                                </span>
                                <span className="px-4 py-1 rounded-full border border-white/20 text-yellow-400 bg-white/5">
                                    ★ {game.rating} / 5
                                </span>
                            </div>
                        </div>

                        <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-4 text-vapor-cyan uppercase tracking-wider">Sobre el juego</h3>
                            <div
                                className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-light"
                                dangerouslySetInnerHTML={{ __html: game.description }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm">
                            <div>
                                <h4 className="font-bold text-vapor-pink mb-2 uppercase tracking-wide">Plataformas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms?.map((p) => (
                                        <span key={p.platform.id} className="bg-black/40 px-3 py-1 rounded text-gray-300 border border-white/10 hover:border-vapor-pink/50 transition-colors">
                                            {p.platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-vapor-pink mb-2 uppercase tracking-wide">Géneros</h4>
                                <div className="flex flex-wrap gap-2">
                                    {game.genres?.map((g) => (
                                        <span key={g.id} className="bg-black/40 px-3 py-1 rounded text-gray-300 border border-white/10 hover:border-vapor-pink/50 transition-colors">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-vapor-pink mb-2 uppercase tracking-wide">Publicado por</h4>
                                <div className="flex flex-wrap gap-2">
                                    {game.publishers?.map((p) => (
                                        <span key={p.id} className="text-white font-medium hover:text-vapor-cyan transition-colors">
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-vapor-pink mb-2 uppercase tracking-wide">Sitio Web</h4>
                                {game.website ? (
                                    <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-vapor-cyan hover:text-white underline decoration-vapor-cyan/50 hover:decoration-white transition-all break-all">
                                        {game.website}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">N/A</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;

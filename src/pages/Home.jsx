import { useEffect, useState } from 'react';
import { getPopularGames } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [popularGames, setPopularGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getPopularGames(4);
                setPopularGames(data.results);
            } catch (error) {
                console.error("Error loading popular games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-vapor-pink font-bold animate-pulse text-xl">CARGANDO SISTEMA...</div>;
    }

    return (
        <div className="relative pb-16 overflow-hidden min-h-screen">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-vapor-purple/20 rounded-full blur-[150px] opacity-30 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-vapor-pink/10 rounded-full blur-[150px] opacity-20"></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-32 pb-24 text-center container mx-auto px-4">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] uppercase">
                    Explora el <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-vapor-pink to-pink-400 drop-shadow-[0_0_10px_rgba(255,42,109,0.5)]">
                        Universo Gaming
                    </span>
                </h1>

                <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                    Sumérgete en la base de datos de videojuegos más potente.
                    <span className="text-vapor-pink font-bold"> Retro, Indie, AAA.</span> Todo está aquí.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        to="/games"
                        className="btn-3d px-12 py-4 rounded-full bg-black text-vapor-pink font-black text-xl tracking-widest shadow-[0_0_20px_rgba(255,42,109,0.4)] hover:shadow-[0_0_40px_rgba(255,42,109,0.8)] hover:scale-105 active:scale-95 transition-all transform hover:-translate-y-1 block md:inline-block w-full md:w-auto text-center"
                    >
                        EXPLORAR
                    </Link>
                </div>
            </div>

            {/* Popular Titles Section */}
            <div className="container mx-auto px-4 relative z-10 mt-8">
                <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-black text-white italic tracking-wider">
                        TÍTULOS <span className="text-vapor-cyan">POPULARES</span>
                    </h2>
                    <Link to="/games" className="text-vapor-pink hover:text-white transition-colors text-sm font-bold uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full border border-vapor-pink/20 hover:border-vapor-pink">
                        Ver Todos →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {popularGames.map((game) => (
                        <Link
                            to={`/game/${game.id}`}
                            key={game.id}
                            className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/10 hover:border-vapor-pink/50 transition-all hover:shadow-[0_0_30px_rgba(255,42,109,0.2)] bg-black/40"
                        >
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform group-hover:translate-y-[-5px]">
                                <h3 className="text-xl font-black text-white mb-2 leading-tight drop-shadow-md uppercase tracking-wide">{game.name}</h3>
                                <div className="flex items-center gap-3 text-xs font-bold">
                                    <span className="bg-vapor-purple/20 text-vapor-purple border border-vapor-purple/50 px-2 py-1 rounded backdrop-blur-sm">
                                        NOTA: {game.metacritic || 'N/A'}
                                    </span>
                                    <span className="text-gray-300 bg-black/50 px-2 py-1 rounded">★ {game.rating}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Link to={`/game/${game.id}`} className="block bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl group hover:border-vapor-pink/50 hover:shadow-[0_0_20px_rgba(255,42,109,0.3)]">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale-[0.3] group-hover:grayscale-0"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
            </div>
            <div className="p-4 relative">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight text-white group-hover:text-vapor-pink transition-colors uppercase tracking-tight">{game.name}</h3>
                    {game.metacritic && (
                        <span className={`border text-xs font-bold px-2 py-1 rounded backdrop-blur-sm ${game.metacritic >= 75 ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                                game.metacritic >= 50 ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' :
                                    'border-red-500/50 text-red-400 bg-red-500/10'
                            }`}>
                            {game.metacritic}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-3">
                    {game.parent_platforms?.map(({ platform }) => (
                        <span key={platform.id} className="bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5">{platform.name}</span>
                    )).slice(0, 3)}
                    {game.parent_platforms?.length > 3 && <span className="px-2 py-0.5 text-gray-500">+</span>}
                </div>
            </div>
        </Link>
    );
};

export default GameCard;

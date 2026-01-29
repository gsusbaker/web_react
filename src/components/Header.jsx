import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/games?search=${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <header className="bg-black/95 border-b border-vapor-purple/20 sticky top-0 z-50 backdrop-blur-md shadow-[0_0_15px_rgba(125,95,255,0.1)]">
            <div className="w-full px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Logo Section */}
                <Link to="/" className="text-2xl font-black tracking-widest text-white hover:text-vapor-pink transition-colors flex items-center gap-2 group">
                    <span className="group-hover:animate-pulse">👾</span>
                    SMOKE<span className="text-vapor-pink drop-shadow-[0_0_5px_rgba(255,42,109,0.8)]">GAMES</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full md:max-w-md relative flex items-center group">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-vapor-cyan transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar juegos..."
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:bg-white/10 focus:outline-none focus:border-vapor-pink focus:ring-1 focus:ring-vapor-pink transition-all placeholder-gray-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider">
                    <Link to="/" className="text-gray-400 hover:text-vapor-pink transition-colors relative group">
                        Inicio
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vapor-pink transition-all group-hover:w-full"></span>
                    </Link>
                    <Link to="/games" className="text-gray-400 hover:text-vapor-pink transition-colors relative group">
                        Explorar
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vapor-pink transition-all group-hover:w-full"></span>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4 ml-2">
                            <span className="text-vapor-cyan font-normal normal-case">Hola, {user.username}</span>
                            <button onClick={logout} className="px-4 py-1.5 text-xs font-bold border border-red-500/50 text-red-400 rounded-full hover:bg-red-500 hover:text-white active:scale-95 transition-all">
                                Salir
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 ml-2">
                            <Link to="/login" className="px-5 py-2 text-xs font-bold border-2 border-vapor-purple text-vapor-purple rounded-full hover:bg-vapor-purple hover:text-white hover:shadow-[0_0_15px_rgba(125,95,255,0.6)] active:bg-vapor-pink active:border-vapor-pink active:text-black active:shadow-[0_0_20px_rgba(255,42,109,0.8)] transition-all btn-3d">
                                LOGIN
                            </Link>
                            <Link to="/register" className="px-5 py-2 text-xs font-bold bg-black text-vapor-pink rounded-full border border-vapor-pink hover:shadow-[0_0_20px_rgba(255,42,109,0.6)] active:scale-95 transition-all shadow-[0_0_10px_rgba(255,42,109,0.4)] btn-3d">
                                REGISTRO
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;

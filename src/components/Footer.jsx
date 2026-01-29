import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black/20 border-t border-white/5 mt-auto pt-12 pb-8 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-2xl font-black tracking-widest text-white mb-4 block hover:text-vapor-pink transition-colors group">
                            SMOKE <span className="text-vapor-pink drop-shadow-[0_0_5px_rgba(255,42,109,0.8)]">GAMES</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
                            Explora el universo del gaming. Descubre, busca y guarda tus títulos favoritos en la plataforma definitiva para jugadores.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Mapa del Sitio</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-vapor-pink transition-colors">Inicio</Link></li>
                            <li><Link to="/games" className="hover:text-vapor-pink transition-colors">Explorar Juegos</Link></li>
                            <li><Link to="/login" className="hover:text-vapor-pink transition-colors">Iniciar Sesión</Link></li>
                            <li><Link to="/register" className="hover:text-vapor-pink transition-colors">Registrarse</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Conectar</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-vapor-pink transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-vapor-pink transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-vapor-pink transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-vapor-pink transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} SMOKE GAMES. Todos los derechos reservados. Datos de RAWG.io.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

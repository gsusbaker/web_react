import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center container mx-auto px-4 py-12 pt-24">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-vapor-pink/30 shadow-[0_0_50px_rgba(255,42,109,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vapor-purple to-vapor-pink"></div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">Nueva Identidad</h1>
                    <p className="text-gray-400 text-sm">Crea tu perfil en la red</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-vapor-purple uppercase mb-2 tracking-wider">Alias</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vapor-pink focus:ring-1 focus:ring-vapor-pink outline-none transition-all placeholder-gray-600"
                            placeholder="NeonRider"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-vapor-purple uppercase mb-2 tracking-wider">Email</label>
                        <input
                            type="email"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vapor-pink focus:ring-1 focus:ring-vapor-pink outline-none transition-all placeholder-gray-600"
                            placeholder="user@grid.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-vapor-purple uppercase mb-2 tracking-wider">Clave</label>
                        <input
                            type="password"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vapor-pink focus:ring-1 focus:ring-vapor-pink outline-none transition-all placeholder-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-vapor-purple uppercase mb-2 tracking-wider">Confirmar Clave</label>
                        <input
                            type="password"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vapor-pink focus:ring-1 focus:ring-vapor-pink outline-none transition-all placeholder-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="btn-3d w-full bg-white text-black font-black py-4 rounded-lg hover:bg-vapor-pink hover:text-black transition-all shadow-lg tracking-widest text-sm">
                        REGISTRAR USUARIO
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-500 text-xs">
                    ¿Ya tienes identidad?
                    <Link to="/login" className="text-vapor-pink hover:text-white font-bold ml-1 transition-colors uppercase">
                        Acceder
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

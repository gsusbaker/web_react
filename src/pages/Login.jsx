import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Use 'admin' as username for simplicity, or treat email as username
        const usernameInput = email.split('@')[0];

        if (login(usernameInput, password)) {
            navigate('/');
        } else {
            setError('Credenciales inválidas. Prueba: admin / 1234');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center container mx-auto px-4 pt-20">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-vapor-purple/30 shadow-[0_0_50px_rgba(125,95,255,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vapor-pink to-vapor-purple"></div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">Sistema de Acceso</h1>
                    <p className="text-gray-400 text-sm">Identifícate para entrar al sistema</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-vapor-pink uppercase mb-2 tracking-wider">Usuario / Email</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vapor-pink focus:ring-1 focus:ring-vapor-pink outline-none transition-all placeholder-gray-600"
                            placeholder="admin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-vapor-purple uppercase mb-2 tracking-wider">Código de Acceso</label>
                        <input
                            type="password"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vapor-purple focus:ring-1 focus:ring-vapor-purple outline-none transition-all placeholder-gray-600"
                            placeholder="••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <input type="checkbox" className="rounded bg-black/40 border-white/10 text-vapor-pink focus:ring-vapor-pink" />
                            Recordar sesión
                        </label>
                        <a href="#" className="hover:text-vapor-cyan transition-colors">¿Olvidaste tu clave?</a>
                    </div>

                    <button className="btn-3d w-full bg-gradient-to-r from-vapor-pink to-vapor-purple text-white font-black py-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(255,42,109,0.4)] transition-all tracking-widest text-sm">
                        INICIAR PROTOCOLO
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-500 text-xs">
                    ¿No tienes credenciales?
                    <Link to="/register" className="text-vapor-cyan hover:text-white font-bold ml-1 transition-colors uppercase">
                        Solicitar Acceso
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEvents } from '../store/slices/eventsSlice';
import { toggleEventAttendance } from '../store/slices/userSlice';

const MyEvents = () => {
    const dispatch = useDispatch();
    const { list: allEvents, loading } = useSelector((state) => state.events);
    const { attendingEvents } = useSelector((state) => state.user);

    useEffect(() => {
        if (allEvents.length === 0) {
            dispatch(getEvents());
        }
    }, [dispatch, allEvents.length]);

    const myEvents = allEvents.filter((event) => attendingEvents.includes(event.id));

    if (loading) return <div className="text-center py-20">Cargando tus eventos...</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-vapor-pink to-vapor-blue">
                Mis Eventos
            </h1>
            {myEvents.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-700">
                    <p className="text-xl text-gray-400 mb-6">No te has apuntado a ningún evento todavía.</p>
                    <Link to="/events" className="px-6 py-3 bg-vapor-blue rounded-lg font-bold hover:bg-vapor-blue/80 transition-all">
                        Ver Eventos Disponibles
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myEvents.map((event) => (
                        <div key={event.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-vapor-blue transition-all group">
                            <div className="h-48 overflow-hidden relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-gray-400 mb-4 flex items-center">
                                    <span className="mr-2">📍</span> {event.location}
                                </p>
                                <button
                                    onClick={() => dispatch(toggleEventAttendance(event.id))}
                                    className="w-full py-2 rounded-lg font-bold bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Cancelar Participación
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEvents;

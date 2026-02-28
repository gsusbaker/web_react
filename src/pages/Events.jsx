import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../store/slices/eventsSlice';
import { toggleEventAttendance } from '../store/slices/userSlice';

const Events = () => {
    const dispatch = useDispatch();
    const { list: events, loading } = useSelector((state) => state.events);
    const { attendingEvents } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const isAttending = (id) => attendingEvents.includes(id);

    if (loading) return <div className="text-center py-20">Cargando eventos...</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-vapor-pink to-vapor-blue">
                Próximos Eventos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-vapor-pink transition-all group">
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
                                className={`w-full py-2 rounded-lg font-bold transition-all ${isAttending(event.id)
                                        ? 'bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white'
                                        : 'bg-vapor-pink/20 text-vapor-pink border border-vapor-pink/50 hover:bg-vapor-pink hover:text-white'
                                    }`}
                            >
                                {isAttending(event.id) ? 'Cancelar Participación' : 'Apuntarse al Evento'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;

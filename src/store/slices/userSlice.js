import { createSlice } from '@reduxjs/toolkit';

// Simular carga de localStorage
const loadFromStorage = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: { name: 'Admin User', username: 'admin' }, // Usuario simulado ya logueado
        favorites: loadFromStorage('user_favorites', []),
        attendingEvents: loadFromStorage('user_events', []),
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const gameId = action.payload;
            if (state.favorites.includes(gameId)) {
                state.favorites = state.favorites.filter(id => id !== gameId);
            } else {
                state.favorites.push(gameId);
            }
            localStorage.setItem('user_favorites', JSON.stringify(state.favorites));
        },
        toggleEventAttendance: (state, action) => {
            const eventId = action.payload;
            if (state.attendingEvents.includes(eventId)) {
                state.attendingEvents = state.attendingEvents.filter(id => id !== eventId);
            } else {
                state.attendingEvents.push(eventId);
            }
            localStorage.setItem('user_events', JSON.stringify(state.attendingEvents));
        },
        logout: (state) => {
            state.currentUser = null;
        }
    }
});

export const { toggleFavorite, toggleEventAttendance, logout } = userSlice.actions;
export default userSlice.reducer;

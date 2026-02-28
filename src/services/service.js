import axios from 'axios';

const API_KEY = '8e97a5746a7c4825abda77c5548ef1a1';
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    }
});

// Games API
export const getPopularGames = async (page_size = 10, page = 1) => {
    try {
        const response = await api.get('/games', {
            params: {
                ordering: '-added',
                page_size: page_size,
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching popular games:", error);
        throw error;
    }
};

export const searchGames = async (query, page_size = 20, page = 1) => {
    try {
        const response = await api.get('/games', {
            params: {
                search: query,
                page_size: page_size,
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching games:", error);
        throw error;
    }
};

export const getGameDetails = async (id) => {
    try {
        const response = await api.get(`/games/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching game ${id} details:`, error);
        throw error;
    }
};

export const getPublishers = async (query = '', page_size = 20, page = 1) => {
    try {
        const response = await api.get('/publishers', {
            params: {
                search: query,
                page_size: page_size,
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching publishers:", error);
        throw error;
    }
};

export const getPublisherDetails = async (id) => {
    try {
        const response = await api.get(`/publishers/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching publisher ${id} details:`, error);
        throw error;
    }
};

export const getGamesByFilter = async (filterType, filterValue, page_size = 20, page = 1) => {
    try {
        const response = await api.get('/games', {
            params: {
                [filterType]: filterValue,
                page_size: page_size,
                page: page,
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching games by ${filterType}:`, error);
        throw error;
    }
};

// Events Mock API
export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Esports Championship",
        location: "Los Angeles",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=800",
    },
];

export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500);
    });
};

export default api;

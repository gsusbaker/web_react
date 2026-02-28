import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/service';

export const fetchPopularGames = createAsyncThunk(
    'games/fetchPopular',
    async ({ page_size, page }) => {
        const data = await api.getPopularGames(page_size, page);
        return data;
    }
);

export const searchGames = createAsyncThunk(
    'games/search',
    async ({ query, page_size, page }) => {
        const data = await api.searchGames(query, page_size, page);
        return data;
    }
);

export const fetchGameDetails = createAsyncThunk(
    'games/fetchDetails',
    async (id) => {
        const data = await api.getGameDetails(id);
        return data;
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        popularGames: [],
        searchResults: [],
        selectedGame: null,
        loading: false,
        error: null,
        count: 0,
    },
    reducers: {
        clearSelectedGame: (state) => {
            state.selectedGame = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularGames.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPopularGames.fulfilled, (state, action) => {
                state.loading = false;
                state.popularGames = action.payload.results;
                state.count = action.payload.count;
            })
            .addCase(fetchPopularGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchGames.fulfilled, (state, action) => {
                state.searchResults = action.payload.results;
                state.count = action.payload.count;
            })
            .addCase(fetchGameDetails.fulfilled, (state, action) => {
                state.selectedGame = action.payload;
            });
    },
});

export const { clearSelectedGame } = gamesSlice.actions;
export default gamesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents as fetchEventsApi } from '../../services/service';

export const getEvents = createAsyncThunk(
    'events/getEvents',
    async () => {
        const data = await fetchEventsApi();
        return data;
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default eventsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
	filters: '',
};

const filterSlice = createSlice({
	name: 'filters',
	initialState: INITIAL_STATE,
	reducers: {
		setFilterValue: (state, action) => {
			state.filters = action.payload;
		},
	},
});

export const filterReducer = filterSlice.reducer;

export const { setFilterValue } = filterSlice.actions;

export const selectFilter = state => state.filter.filters;

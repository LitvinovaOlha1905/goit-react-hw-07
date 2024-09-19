import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectFilter } from './filtersSlice';
import { addContact, deleteContact, fetchContacts} from './contactsOps';

const INITIAL_STATE = {
	items: [],
	loading: false,
	error: null,
};

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteContact.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter(
					contact => contact.id !== action.payload.id
				);
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addContact.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const contactsReducer = contactsSlice.reducer;

// Селекторы для выборки данных из состояния
export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

// Мемоизированный селектор для фильтрации контактов
export const selectFilteredContacts = createSelector(
	[selectContacts, selectFilter],
	(contacts, filter) => {
		return contacts.filter(user =>
			user.name.toLowerCase().includes(filter.toLowerCase())
		);
	}
);

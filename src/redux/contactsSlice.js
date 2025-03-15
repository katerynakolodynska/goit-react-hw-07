import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectFilter } from "./filtersSlice";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlerPending = (state) => {
  state.isLoading = true;
};

const handlerRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlerPending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handlerRejected)
      .addCase(addContact.pending, handlerPending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handlerRejected)
      .addCase(deleteContact.pending, handlerPending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteContact.rejected, handlerRejected);
  },
});

const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  }
);

export const contactsReducer = contactSlice.reducer;
export default contactsReducer;

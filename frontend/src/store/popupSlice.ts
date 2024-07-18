import { createSlice } from "@reduxjs/toolkit";
import { State } from "./store";

const popupSlice = createSlice({
  name: 'popup',
  initialState: {isOpened: false},
  reducers: {
    openPopup: (state) => {
      state.isOpened = true;
    },
    closePopup: (state) => {
      state.isOpened = false;
    },
    switchOpen: (state) => {
      state.isOpened = !state.isOpened;
    }
  }
});

export const selectPopupOpen = (state: State) => state.popup.isOpened;
export const {openPopup, closePopup, switchOpen} = popupSlice.actions;
export default popupSlice.reducer;

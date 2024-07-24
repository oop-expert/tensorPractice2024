import { createSlice } from "@reduxjs/toolkit";
import { State } from "./store";

const popupSlice = createSlice({
  name: 'popup',
  initialState: {isQrOpened: false, isQuitOpened: false, closeWindow: false},
  reducers: {
    openQrPopup: (state) => {
      state.isQrOpened = true;
      state.isQuitOpened = false;
    },
    closePopup: (state) => {
      state.isQrOpened = false;
      state.isQuitOpened = false;
    },
    openQuitPopup: (state, action) => {
      state.isQrOpened = false;
      state.isQuitOpened = true;
      state.closeWindow = action.payload;
    }
  }
});

export const selectPopupOpen = (state: State) => state.popup;
export const {openQrPopup, closePopup, openQuitPopup} = popupSlice.actions;
export default popupSlice.reducer;

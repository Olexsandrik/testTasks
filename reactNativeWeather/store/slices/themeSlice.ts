import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "changeDarkMode",
	initialState: {
		darkMode: false,
	},
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
	},
});

export default themeSlice.reducer;
export const { setDarkMode } = themeSlice.actions;

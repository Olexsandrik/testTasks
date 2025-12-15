import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
	name: "location",
	initialState: {
		location: {
			latitude: null,
			longitude: null,
		},
	},
	reducers: {
		setLocationAction: (state, action) => {
			state.location = action.payload;
		},
		resetLocationAction: (state) => {
			state.location = {
				latitude: null,
				longitude: null,
			};
		},

	}
});

export default locationSlice.reducer;
export const { setLocationAction } = locationSlice.actions;

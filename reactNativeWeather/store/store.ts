import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import locationReducer from "./slices/locationSlice";
export const store = configureStore({
	reducer: {
		theme: themeReducer,
		location: locationReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>

export default store
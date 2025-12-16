import React from "react";
import { View, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../../store/slices/themeSlice";
import { lightTheme, darkTheme } from "../../../utils/theme/theme";

export default function ChangeThemeScreen() {
	const dispatch = useDispatch();
	const { darkMode } = useSelector((state: any) => state.theme);
	const handleDarkMode = () => {
		dispatch(setDarkMode(!darkMode));
	};
	const theme = darkMode ? darkTheme : lightTheme;
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.backgroundColor,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					backgroundColor: theme.backgroundColor,
				}}
			>
				<Switch
					value={darkMode}
					style={{ padding: 10 }}
					onValueChange={handleDarkMode}
				/>
			</View>
		</View>
	);
}

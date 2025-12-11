import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../../utils/theme/theme";
import AnalisWeather from "../../../components/AnalisWeather/AnalisWeather";

export default function HomeScreen() {
	const { darkMode } = useSelector((state: any) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;
	return (
		<View
			style={{
				flex: 1,
				paddingTop: 100,
				alignItems: "center",
				backgroundColor: theme.backgroundColor,
			}}
		>
			<AnalisWeather />
		</View>
	);
}

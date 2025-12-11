import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../../utils/theme/theme";

export default function HomeScreen() {
	const { darkMode } = useSelector((state: any) => state.theme);
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
			<Text style={{ color: theme.color }}>Home</Text>
		</View>
	);
}

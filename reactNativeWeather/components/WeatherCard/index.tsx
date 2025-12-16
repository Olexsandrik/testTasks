import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { WeatherData } from "../../types";
import { darkTheme, lightTheme } from "../../utils/theme/theme";

export const WeatherCard = ({ weatherData }: { weatherData: WeatherData }) => {
	const { t } = useTranslation();
	const { darkMode } = useSelector((state: RootState) => state.theme);
	const theme = darkMode ? darkTheme : lightTheme;
	return (
		<View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
			<View style={styles.header}>
				<Text style={[styles.date, { color: theme.color }]}>
					{weatherData.date}
				</Text>

				<Image
					source={{ uri: `https:${weatherData.day.condition.icon}` }}
					style={styles.icon}
				/>
			</View>
			<View style={styles.temps}>
				<Text style={[styles.tempText, { color: theme.color }]}>
					{t("weatherCard.max")}: {weatherData.day.maxtemp_c}°C
				</Text>
				<Text style={[styles.tempText, { color: theme.color }]}>
					{t("weatherCard.min")}: {weatherData.day.mintemp_c}°C
				</Text>
			</View>
			<Text style={[styles.condition, { color: theme.color }]}>
				{weatherData.day.condition.text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 12,
		padding: 15,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	date: {
		fontSize: 16,
		fontWeight: "bold",
	},
	icon: {
		width: 50,
		height: 50,
	},
	temps: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	tempText: {
		fontSize: 14,
		fontWeight: "600",
	},
	condition: {
		fontSize: 14,
		fontStyle: "italic",
		textAlign: "center",
	},
});

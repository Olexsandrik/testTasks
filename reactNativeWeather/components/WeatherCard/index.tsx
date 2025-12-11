import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const WeatherCard = ({ weatherData }: { weatherData: any }) => {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.date}>{weatherData.date}</Text>

				<Image
					source={{ uri: `https:${weatherData.day.condition.icon}` }}
					style={styles.icon}
				/>
			</View>
			<View style={styles.temps}>
				<Text style={styles.tempText}>Max: {weatherData.day.maxtemp_c}°C</Text>
				<Text style={styles.tempText}>Min: {weatherData.day.mintemp_c}°C</Text>
			</View>
			<Text style={styles.condition}>{weatherData.day.condition.text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#4da6ff",
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
		color: "#fff",
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
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
	},
	condition: {
		color: "#fff",
		fontSize: 14,
		fontStyle: "italic",
		textAlign: "center",
	},
});

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useWeather } from "../../server/useWeather";
import { setLocationAction } from "../../store/slices/locationSlice";
import type { RootState } from "../../store/store";
import type { WeatherData } from "../../types";
import { darkTheme, lightTheme } from "../../utils/theme/theme";
import WeatherButton from "../ui/WeatherButton";
import WeatherList from "../WeatherList";

const AnalisWeather = () => {
	const { t } = useTranslation();

	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const { weatherData, handlerWeatherData } = useWeather(
		location?.coords.latitude,
		location?.coords.longitude,
	);

	const [city, setCity] = useState<string | null>(null);

	const dispatch = useDispatch();

	const { darkMode } = useSelector((state: RootState) => state.theme);

	const theme = darkMode ? darkTheme : lightTheme;

	const weatherDataArray: WeatherData[] = weatherData || [];

	const getCityFromCoords = useCallback(
		async (lat: number, lon: number) => {
			try {
				const result = await Location.reverseGeocodeAsync({
					latitude: lat,
					longitude: lon,
				});
				setCity(result[0].city);
			} catch (error) {
				console.error(t("weatherAnalytics.errorGeocoding"), error);
				setCity(t("weatherAnalytics.locationUnavailable"));
			}
		},
		[t],
	);

	useEffect(() => {
		async function getCurrentLocation() {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log(t("weatherAnalytics.permissionDenied"));
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			dispatch(
				setLocationAction({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				}),
			);

			getCityFromCoords(location.coords.latitude, location.coords.longitude);
		}

		getCurrentLocation();
	}, [getCityFromCoords, dispatch, t]);

	const WeatherButttons = [
		{
			days: 1,
			title: t("weatherAnalytics.buttons.today"),
			icon: "calendar-today",
		},
		{
			days: 3,
			title: t("weatherAnalytics.buttons.threeDay"),
			icon: "calendar-week",
		},
		{
			days: 14,
			title: t("weatherAnalytics.buttons.fourteenDay"),
			icon: "calendar-month",
		},
	];

	const renderHeader = () => (
		<>
			<View style={styles.header}>
				<MaterialCommunityIcons
					name="weather-partly-cloudy"
					size={48}
					color="#4da6ff"
				/>
				<Text style={[styles.title, { color: theme.color }]}>
					{t("weatherAnalytics.title")}
				</Text>
				<Text
					style={[
						styles.subtitle,
						{ color: theme.color === "#000000" ? "#000000" : "#FFFFFF" },
					]}
				>
					{t("weatherAnalytics.subtitle")}
				</Text>
			</View>

			{location && (
				<View
					style={[
						styles.locationCard,
						{
							backgroundColor:
								theme.color === "#000000" ? "#FFFFFF" : "#000000",
						},
					]}
				>
					<MaterialCommunityIcons name="map-marker" size={20} color="#4da6ff" />

					<Text style={[styles.locationText, { color: theme.color }]}>
						Location: {city || t("weatherAnalytics.locationLoading")}
					</Text>
				</View>
			)}

			<View style={styles.buttonContainer}>
				{WeatherButttons.map((button) => (
					<WeatherButton
						key={button.days}
						title={button.title}
						icon={button.icon as keyof typeof MaterialCommunityIcons.glyphMap}
						days={button.days}
						onPress={async () => {
							await handlerWeatherData(button.days);
						}}
					/>
				))}
			</View>

			{weatherDataArray && weatherDataArray.length > 0 && (
				<Text style={[styles.sectionTitle, { color: theme.color }]}>
					{t("weatherAnalytics.forecastResults")}
				</Text>
			)}
		</>
	);

	return (
		<View
			style={[styles.container, { backgroundColor: theme.backgroundColor }]}
		>
			<View style={styles.container}>
				{renderHeader()}

				<WeatherList weatherData={weatherDataArray} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	header: {
		alignItems: "center",
		paddingTop: 50,
		paddingBottom: 30,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 15,
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
	},
	locationCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 12,
		marginBottom: 25,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	locationText: {
		fontSize: 14,
		marginLeft: 8,
		fontWeight: "500",
	},
	buttonContainer: {
		marginBottom: 30,
	},
	weatherButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		borderRadius: 15,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 4,
		borderWidth: 1,
		borderColor: "rgba(77, 166, 255, 0.2)",
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 15,
		flex: 1,
	},
	buttonSubtext: {
		fontSize: 12,
		fontWeight: "400",
	},
	weatherSection: {
		marginTop: 10,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
});

export default AnalisWeather;

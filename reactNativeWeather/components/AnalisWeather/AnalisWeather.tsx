import * as Location from "expo-location";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useWeather } from "../../server/useWeather";
import WeatherList from "../WeatherList";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "../../utils/theme/theme";
import { WeatherData } from "../../types";
import WeatherButton from "../ui/WeatherButton";
import { setLocationAction } from "../../store/slices/locationSlice";


const AnalisWeather = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const { weatherData, handlerWeatherData } = useWeather(
		location?.coords.latitude,
		location?.coords.longitude
	);

	const [city, setCity] = useState<any>(null);


	const dispatch = useDispatch();

	const { darkMode } = useSelector((state: any) => state.theme);

	const theme = darkMode ? darkTheme : lightTheme;

	const weatherDataArray: WeatherData[] = weatherData || [];




	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			dispatch(setLocationAction({latitude: location.coords.latitude, longitude: location.coords.longitude}));

			getCityFromCoords(location.coords.latitude, location.coords.longitude);
		}

		getCurrentLocation();
		
	}, []);



	const getCityFromCoords = useCallback(async (lat: number, lon: number) => {
		try {
			const result = await Location.reverseGeocodeAsync({
				latitude: lat,
				longitude: lon,
			});
			setCity(result[0]);
		} catch (error) {
			console.error("Error geocoding:", error);
			setCity({ city: "Location unavailable" });
		}
	}, []);

	const formatLocation = (locationObj: any) => {
		if (!locationObj) return "Unknown location";

		const city = locationObj.city || locationObj.name || locationObj.region;
		const region = locationObj.region && locationObj.region !== city ? locationObj.region : '';
		const country = locationObj.country || '';

		const parts = [city, region || country].filter(Boolean);
		return parts.join(', ') || "Unknown location";
	};

	const WeatherButttons = [
		{
			days: 1,
			title: "Today's Weather",
			icon: "calendar-today",
		},
		{
			days: 3,
			title: "3-Day Forecast",
			icon: "calendar-week",
	
		},
		{
			days: 14,
			title: "14-Day Forecast",
			icon: "calendar-month",
		}
	]


	return (
		<ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

			<View style={styles.header}>
				<MaterialCommunityIcons name="weather-partly-cloudy" size={48} color="#4da6ff" />
				<Text style={[styles.title, { color: theme.color }]}>Weather Analytics</Text>
				<Text style={[styles.subtitle, { color: theme.color === '#000000' ? '#000000'  :  '#FFFFFF' }]}>
					Get detailed weather forecasts
				</Text>
			</View>


			
			{location && (
				<View style={[styles.locationCard, { backgroundColor: theme.color === '#000000' ? '#FFFFFF' : '#000000' }]}>
					<MaterialCommunityIcons name="map-marker" size={20} color="#4da6ff" />
				
					<Text style={[styles.locationText, { color: theme.color }]}>
						Location: {city ? formatLocation(city) : 'Loading location...'}
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
				<View style={styles.weatherSection}>
					<Text style={[styles.sectionTitle, { color: theme.color }]}>
						Forecast Results
					</Text>
					<WeatherList weatherData={weatherDataArray} />
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	header: {
		alignItems: 'center',
		paddingTop: 50,
		paddingBottom: 30,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginTop: 15,
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
	},
	locationCard: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderRadius: 12,
		marginBottom: 25,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	locationText: {
		fontSize: 14,
		marginLeft: 8,
		fontWeight: '500',
	},
	buttonContainer: {
		marginBottom: 30,
	},
	weatherButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		borderRadius: 15,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 4,
		borderWidth: 1,
		borderColor: 'rgba(77, 166, 255, 0.2)',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 15,
		flex: 1,
	},
	buttonSubtext: {
		fontSize: 12,
		fontWeight: '400',
	},
	weatherSection: {
		marginTop: 10,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default AnalisWeather;

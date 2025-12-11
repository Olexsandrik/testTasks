import React, { useEffect, useState } from "react";
import { View, Button, FlatList } from "react-native";
import { useWeather } from "../../server/useWeather";
import WeatherList from "../WeatherList";
import * as Location from "expo-location";
const AnalisWeather = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const { weatherData, handlerWeatherData } = useWeather(
		location?.coords.latitude,
		location?.coords.longitude
	);

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});

			setLocation(location);
		}

		getCurrentLocation();
	}, []);

	return (
		<View>
			<Button
				title="To day weather"
				onPress={async () => {
					await handlerWeatherData(1);
				}}
			/>
			<Button
				title="analys weather 3 days"
				onPress={async () => {
					await handlerWeatherData(3);
				}}
			/>
			<Button
				title="analys weather 14 days"
				onPress={async () => {
					await handlerWeatherData(14);
				}}
			/>

			<WeatherList weatherData={weatherData || []} />
		</View>
	);
};

export default AnalisWeather;

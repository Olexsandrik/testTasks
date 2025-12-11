import React from "react";
import { FlatList } from "react-native";
import { WeatherCard } from "../WeatherCard";
import { WeatherData } from "../../types";

const WeatherList = ({ weatherData }: { weatherData: WeatherData[] }) => {
	return (
		<FlatList
			data={weatherData}
			keyExtractor={(item) => item.date}
			renderItem={({ item }) => <WeatherCard weatherData={item} />}
			contentContainerStyle={{ padding: 10 }}
		/>
	);
};

export default WeatherList;

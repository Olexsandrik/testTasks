import React from "react";
import { FlatList } from "react-native";
import { WeatherCard } from "../WeatherCard";

const WeatherList = ({ weatherData }: { weatherData: any }) => {
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

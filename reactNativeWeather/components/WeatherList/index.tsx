import React from "react";
import { FlatList, ViewStyle } from "react-native";
import { WeatherCard } from "../WeatherCard";
import { WeatherData } from "../../types";

interface WeatherListProps {
	weatherData: WeatherData[];
	ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
	contentContainerStyle?: ViewStyle;
}

const WeatherList = ({ weatherData, ListHeaderComponent, contentContainerStyle }: WeatherListProps) => {
	return (
		<FlatList
			data={weatherData}
			keyExtractor={(item) => item.date}
			renderItem={({ item }) => <WeatherCard weatherData={item} />}
			contentContainerStyle={[{ padding: 10 }, contentContainerStyle]}
			ListHeaderComponent={ListHeaderComponent}
		/>
	);
};

export default WeatherList;

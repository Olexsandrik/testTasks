import { FlatList } from "react-native";
import type { WeatherData } from "../../types";
import { WeatherCard } from "../WeatherCard";

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

import { useCallback, useState } from "react";
export const useWeather = (latitude?: number, longitude?: number) => {
	const [weatherData, setWeatherData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handlerWeatherData = useCallback(
		async (days: number) => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`${process.env.BASE_URL}/forecast.json?key=${process.env.API_KEY}&q=${latitude},${longitude}&days=${days}`,
				);
				const responseData = await response.json();

				setWeatherData(responseData.forecast.forecastday);
			} catch (error) {
				console.error(error);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[latitude, longitude],
	);

	return { weatherData, handlerWeatherData, isLoading };
};

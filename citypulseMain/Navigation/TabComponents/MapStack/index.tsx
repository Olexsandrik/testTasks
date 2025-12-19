import MapboxGL from "@rnmapbox/maps";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

MapboxGL.setAccessToken(
	"pk.eyJ1Ijoib2xla3NhbmRyaWt3ZWIiLCJhIjoiY21kdXNieXV1MG11eTJscXdvZnAwcXlpNiJ9.y6ci_jMJznITHbispXjEbw",
);

export default function MapStack() {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Location permission denied");
				return;
			}
			const loc = await Location.getCurrentPositionAsync({});
			setLocation(loc);
			setLoading(false);
		})();
	}, []);

	return (
		<MapboxGL.MapView style={styles.map}>
			<MapboxGL.UserLocation />
		</MapboxGL.MapView>
	);
}

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});

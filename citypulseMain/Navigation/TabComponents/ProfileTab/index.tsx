import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
export default function ProfileTab() {
	const [errorMsg, setErrorMsg] = useState("");
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	useEffect(() => {
		async function getCurrentLocation() {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				return;
			}

			const locationData = await Location.getCurrentPositionAsync({});

			console.log(locationData);
			setLocation(locationData);
		}

		getCurrentLocation();
	}, []);
	return (
		<View>
			<Text>Profile</Text>
		</View>
	);
}

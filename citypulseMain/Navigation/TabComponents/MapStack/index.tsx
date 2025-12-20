import { useIsFocused } from "@react-navigation/native";
import type { OnPressEvent } from "@rnmapbox/maps";
import MapboxGL from "@rnmapbox/maps";
import * as Location from "expo-location";
import type { FeatureCollection } from "geojson";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import LineRoute from "../../../components/LineRoute";
import LocationButton from "../../../components/LocationButton";
import { MarkerDetails } from "../../../components/MarkerDetails";
import { useCategory } from "../../../providers/CategoryProvider";
import type { DataTypeOfMarkers } from "../../../types/type";
import {
	circleLayers,
	getMarkerColor,
	getMarkerConfig,
} from "../../../untils/unitls";

MapboxGL.setAccessToken(process.env.MAPBOX_TOKEN as string);
export default function MapStack() {
	const { directionCoordinates, setSelectedCategory } = useCategory();

	// Додай useEffect щоб відслідковувати зміни

	// Тест щоб переконатися що setSelectedCategory працює
	// useEffect(() => {
	// 	if (selectedCategory) {
	// 		console.log("🎉 selectedCategory змінилося! Тепер буде виклик API...");
	// 		// Через 2 секунди перевіри чи directionCoordinates оновився
	// 		setTimeout(() => {
	// 			console.log(
	// 				"⏰ Перевірка через 2 сек - directionCoordinates:",
	// 				directionCoordinates,
	// 			);
	// 		}, 2000);
	// 	}
	// }, [selectedCategory]);

	const [markers] = useState<DataTypeOfMarkers[]>([
		{
			id: 1,
			name: "Street Music Festival",
			type: "music",
			latitude: 48.9226,
			longitude: 24.7111,
		},
		{
			id: 2,
			name: "Food Market",
			type: "food",
			latitude: 48.9241,
			longitude: 24.7053,
		},
		{
			id: 3,
			name: "Art Exhibition",
			type: "art",
			latitude: 48.9189,
			longitude: 24.7138,
		},
		{
			id: 4,
			name: "Tech Meetup",
			type: "tech",
			latitude: 48.9212,
			longitude: 24.7205,
		},
		{
			id: 5,
			name: "Night Cinema",
			type: "entertainment",
			latitude: 48.926,
			longitude: 24.709,
		},
	]);
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);

	const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
	const cameraRef = useRef<MapboxGL.Camera>(null);

	const isFocused = useIsFocused();

	useEffect(() => {
		// get location of user with use permissions.
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Location permission denied");
				return;
			}
			const loc = await Location.getCurrentPositionAsync({});
			setLocation(loc);
		})();
	}, []);

	useEffect(() => {
		//focues on geolocation of user
		if (isFocused && location && cameraRef.current) {
			cameraRef.current.setCamera({
				centerCoordinate: [location.coords.longitude, location.coords.latitude],
				zoomLevel: 15,
				animationDuration: 1000,
			});
		}
	}, [isFocused, location]);

	const mockDataMarkers = useMemo(() => {
		return {
			type: "FeatureCollection",
			features: markers.map((item) => ({
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [item.longitude, item.latitude],
				},
				properties: {
					id: item.id,
					title: item.name,
					icon: getMarkerColor(item.type),
					type: item.type,
				},
			})),
		};
	}, [markers]);

	const handleMarkerPress = useCallback(
		(e: OnPressEvent) => {
			console.log("🎯 handleMarkerPress called with event:", e);
			if (e?.features[0].geometry.coordinates) {
				const newCoordinates = e?.features[0].geometry.coordinates as [
					number,
					number,
				];
				console.log("📍 Extracted coordinates:", newCoordinates);

				if (newCoordinates) {
					console.log("📷 Moving camera to:", newCoordinates);
					cameraRef.current?.setCamera({
						centerCoordinate: [newCoordinates[0], newCoordinates[1]],
						zoomLevel: 15,
						animationDuration: 1000,
					});

					console.log("🏁 Calling setSelectedCategory with:", newCoordinates);
					setSelectedCategory(newCoordinates);
					console.log(
						"✅ setSelectedCategory called - state should update soon...",
					);
				}
			} else {
				console.log("❌ No coordinates in event");
			}
		},
		[setSelectedCategory],
	);

	const dynamicCircleLayers = [
		{
			...circleLayers[0],
		},
		{
			...circleLayers[1],
		},
		{
			id: "selected-event",
			filter: selectedMarkerId
				? ["==", ["get", "id"], selectedMarkerId]
				: ["==", ["get", "id"], -1],
			style: {
				circleRadius: 20,
				circleColor: [
					"match",
					["get", "type"],
					"music",
					"#FF4757",
					"food",
					"#26A69A",
					"art",
					"#1976D2",
					"tech",
					"#4CAF50",
					"entertainment",
					"#FFC107",
					"#757575",
				],
				circleOpacity: 1.0,
				circleStrokeWidth: 3,
				circleStrokeColor: "#FFFFFF",
				circlePitchAlignment: "map",
			},
		},
		{
			id: "selected-inner-highlight",
			filter: selectedMarkerId
				? ["==", ["get", "id"], selectedMarkerId]
				: ["==", ["get", "id"], -1],
			style: {
				circleRadius: 12,
				circleColor: "#FFFFFF",
				circleOpacity: 0.6,
			},
		},
		{
			id: "selected-event-pulse-outer",
			filter: selectedMarkerId
				? ["==", ["get", "id"], selectedMarkerId]
				: ["==", ["get", "id"], -1],
			style: {
				circleRadius: 28,
				circleColor: "transparent",
				circleOpacity: 0.2,
				circleStrokeWidth: 1.5,
				circleStrokeColor: [
					"match",
					["get", "type"],
					"music",
					"#FF6B6B",
					"food",
					"#4ECDC4",
					"art",
					"#45B7D1",
					"tech",
					"#96CEB4",
					"entertainment",
					"#FFEAA7",
					"#A8A8A8",
				],
			},
		},
		{
			id: "selected-event-pulse-inner",
			filter: selectedMarkerId
				? ["==", ["get", "id"], selectedMarkerId]
				: ["==", ["get", "id"], -1],
			style: {
				circleRadius: 35,
				circleColor: "transparent",
				circleOpacity: 0.1,
				circleStrokeWidth: 1,
				circleStrokeColor: [
					"match",
					["get", "type"],
					"music",
					"#FF6B6B",
					"food",
					"#4ECDC4",
					"art",
					"#45B7D1",
					"tech",
					"#96CEB4",
					"entertainment",
					"#FFEAA7",
					"#A8A8A8",
				],
			},
		},
	];

	const handleLocationPress = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Location permission denied");
				return;
			}

			const userLocation = await Location.getCurrentPositionAsync();
			if (!userLocation) return;

			cameraRef.current?.setCamera({
				centerCoordinate: [
					userLocation.coords.longitude,
					userLocation.coords.latitude,
				],
				zoomLevel: 15,
				animationDuration: 1000,
			});
		} catch (error) {
			console.error("Помилка отримання локації:", error);
		}
	};

	return (
		<View style={styles.container}>
			<MapboxGL.MapView
				style={styles.container}
				onPress={() => setSelectedMarkerId(null)}
			>
				<MapboxGL.Camera ref={cameraRef} />
				<MapboxGL.UserLocation
					showsUserHeadingIndicator={true}
					visible={true}
				/>

				<MapboxGL.ShapeSource
					id="events"
					shape={mockDataMarkers as FeatureCollection}
					onPress={(e: OnPressEvent) => handleMarkerPress(e)}
				>
					{dynamicCircleLayers.map((layer) => (
						<MapboxGL.CircleLayer
							key={layer.id}
							id={layer.id}
							filter={layer.filter}
							style={layer.style}
						/>
					))}
				</MapboxGL.ShapeSource>

				{selectedMarkerId &&
					(() => {
						const selectedMarker = markers.find(
							(m) => m.id === selectedMarkerId,
						);
						if (!selectedMarker) return null;

						const config = getMarkerConfig(selectedMarker.type);

						return (
							<MapboxGL.MarkerView
								key={`callout-${selectedMarker.id}`}
								coordinate={[selectedMarker.longitude, selectedMarker.latitude]}
								anchor={{ x: 0.5, y: 1.1 }}
							>
								<MarkerDetails
									config={config}
									selectedMarker={selectedMarker}
								/>
							</MapboxGL.MarkerView>
						);
					})()}

				{directionCoordinates && (
					<LineRoute coordinates={directionCoordinates} />
				)}
			</MapboxGL.MapView>

			<LocationButton onPress={handleLocationPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		position: "relative",
	},
	markerContainer: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 8,
		minWidth: 120,
		maxWidth: 200,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderWidth: 2,
		borderColor: "#fff",
	},
	markerPointer: {
		position: "absolute",
		bottom: -8,
		left: "50%",
		marginLeft: -8,
		width: 0,
		height: 0,
		borderLeftWidth: 8,
		borderRightWidth: 8,
		borderTopWidth: 8,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderTopColor: "#fff",
	},
	markerText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#333",
		textAlign: "center",
		marginBottom: 4,
	},
	markerType: {
		fontSize: 10,
		fontWeight: "500",
		color: "#666",
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	markerGlow: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
	},
});

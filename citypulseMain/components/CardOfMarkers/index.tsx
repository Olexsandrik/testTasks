import { Ionicons } from "@expo/vector-icons";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { DataTypeOfMarkers } from "../../types/type";
import { getMarkerConfig } from "../../untils/unitls";

const CardOfMarkers = ({ marker }: { marker: DataTypeOfMarkers }) => {
	const markerConfig = getMarkerConfig(marker.type || "default");

	const navigation = useNavigation<NavigationProp<any>>();
	const handleMarkerDetails = useCallback(() => {
		navigation.navigate("ListOfMarkersDetails", { marker });
	}, [marker, navigation]);
	return (
		<Pressable
			style={[styles.container, { borderLeftColor: markerConfig.color }]}
			onPress={handleMarkerDetails}
		>
			{/* Header with type icon and color indicator */}
			<View style={styles.header}>
				<View
					style={[
						styles.typeIndicator,
						{ backgroundColor: markerConfig.color },
					]}
				>
					<Ionicons name={markerConfig.icon} size={16} color="#fff" />
				</View>
				<View style={styles.typeContainer}>
					<Text style={styles.typeText}>
						{marker.type?.toUpperCase() || "CUSTOM"}
					</Text>
				</View>
			</View>

			{/* Marker Name */}
			<Text style={styles.name} numberOfLines={2}>
				{marker.name}
			</Text>

			{/* Description */}
			{marker.description && (
				<Text style={styles.description} numberOfLines={2}>
					{marker.description}
				</Text>
			)}

			{/* Image */}
			{marker.image && (
				<Image source={{ uri: marker.image }} style={styles.markerImage} />
			)}

			{/* Footer with coordinates */}
			<View style={styles.footer}>
				<View style={styles.coordsContainer}>
					<Ionicons name="location" size={12} color="#666" />
					<Text style={styles.coordsText}>
						{marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
					</Text>
				</View>
				{marker.typeOfMarker && (
					<View
						style={[
							styles.categoryBadge,
							{ backgroundColor: markerConfig.backgroundColor },
						]}
					>
						<Text style={[styles.categoryText, { color: markerConfig.color }]}>
							{marker.typeOfMarker}
						</Text>
					</View>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 16,
		marginVertical: 6,
		marginHorizontal: 2,
		borderLeftWidth: 4,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		borderWidth: 1,
		borderColor: "#f0f0f0",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	typeIndicator: {
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	typeContainer: {
		flex: 1,
	},
	typeText: {
		fontSize: 11,
		fontWeight: "700",
		color: "#666",
		letterSpacing: 0.5,
	},
	name: {
		fontSize: 18,
		fontWeight: "700",
		color: "#1a1a1a",
		marginBottom: 8,
		lineHeight: 22,
	},
	description: {
		fontSize: 14,
		color: "#666",
		lineHeight: 18,
		marginBottom: 12,
	},
	markerImage: {
		width: "100%",
		height: 120,
		borderRadius: 8,
		marginBottom: 12,
		backgroundColor: "#f5f5f5",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	coordsContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	coordsText: {
		fontSize: 12,
		color: "#666",
		marginLeft: 4,
		fontFamily: "monospace",
	},
	categoryBadge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		marginLeft: 8,
	},
	categoryText: {
		fontSize: 11,
		fontWeight: "600",
	},
});

export default CardOfMarkers;

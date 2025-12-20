import type { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";
import { getDirections } from "../api/direction";

const CategoryContext = createContext<CategoryContextType>({
	selectedCategory: null,
	setSelectedCategory: () => {},
	directionCoordinates: [],
	routeTime: 0,
	routeDistance: 0,
	direction: null,
});

export type CategoryContextType = {
	selectedCategory: [number, number] | null;
	setSelectedCategory: React.Dispatch<
		React.SetStateAction<[number, number] | null>
	>;
	directionCoordinates: [number, number][] | null;
	routeTime: number | null;
	routeDistance: number | null;
	direction: any;
};

export default function CategoryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [selectedCategory, setSelectedCategory] = useState<
		[number, number] | null
	>(null);
	const [direction, setDirection] = useState<any>();

	// Додай useEffect щоб відслідковувати зміни direction
	useEffect(() => {
		console.log("📦 direction state changed:", direction);
		if (direction?.routes?.[0]?.geometry?.coordinates) {
			console.log(
				"✅ Valid coordinates received:",
				direction.routes[0].geometry.coordinates.length,
				"points",
			);
		}
	}, [direction]);

	const fetchDirections = async () => {
		if (!selectedCategory) return;
		try {
			const userLocation = await Location.getCurrentPositionAsync();
			console.log("Користувач локація:", userLocation.coords);
			const newDirectionCoordinates = await getDirections(
				[userLocation.coords.longitude, userLocation.coords.latitude],
				[selectedCategory[0], selectedCategory[1]] as Position,
			);

			console.log("API повернув:", newDirectionCoordinates);
			if (!newDirectionCoordinates?.routes?.[0]?.geometry?.coordinates) {
				console.error("Невалідна відповідь!");
			}
			setDirection(newDirectionCoordinates);
		} catch (error) {
			console.error("Error fetching directions:", error);
		}
	};

	useEffect(() => {
		console.log(
			"🎯 useEffect triggered with selectedCategory:",
			selectedCategory,
		);
		if (selectedCategory) {
			console.log("🚀 Calling fetchDirections...");
			fetchDirections(); // Викликай без await - useEffect не може бути async
		} else {
			console.log("⏭️ selectedCategory is null, skipping fetchDirections");
		}
	}, [selectedCategory]); // Тільки selectedCategory!
	return (
		<CategoryContext.Provider
			value={{
				selectedCategory,
				setSelectedCategory,
				direction,
				directionCoordinates: direction?.routes?.[0]?.geometry
					?.coordinates as Position[],
				routeTime: direction?.routes?.[0]?.duration,
				routeDistance: direction?.routes?.[0]?.distance,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
}

export const useCategory = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useScooter must be used within a CategoryProvider");
	}
	return context;
};

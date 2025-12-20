export const getMarkerColor = (type: string) => {
	switch (type) {
		case "music":
			return "#FF6B6B"; // Red
		case "food":
			return "#4ECDC4"; // Teal
		case "art":
			return "#45B7D1"; // Blue
		case "tech":
			return "#96CEB4"; // Green
		case "entertainment":
			return "#FFEAA7"; // Yellow
		default:
			return "#A8A8A8"; // Gray
	}
};

export const getMarkerConfig = (type: string) => {
	switch (type) {
		case "music":
			return {
				color: "#FF6B6B",
				gradient: ["#FF6B6B", "#FF3838"],
				icon: "musical-notes" as const,
				backgroundColor: "rgba(255, 107, 107, 0.15)",
				shadowColor: "#FF6B6B",
			};
		case "food":
			return {
				color: "#4ECDC4",
				gradient: ["#4ECDC4", "#00BFA5"],
				icon: "restaurant" as const,
				backgroundColor: "rgba(78, 205, 196, 0.15)",
				shadowColor: "#4ECDC4",
			};
		case "art":
			return {
				color: "#45B7D1",
				gradient: ["#45B7D1", "#0288D1"],
				icon: "color-palette" as const,
				backgroundColor: "rgba(69, 183, 209, 0.15)",
				shadowColor: "#45B7D1",
			};
		case "tech":
			return {
				color: "#96CEB4",
				gradient: ["#96CEB4", "#43A047"],
				icon: "hardware-chip" as const,
				backgroundColor: "rgba(150, 206, 180, 0.15)",
				shadowColor: "#96CEB4",
			};
		case "entertainment":
			return {
				color: "#FFEAA7",
				gradient: ["#FFEAA7", "#FFB300"],
				icon: "film" as const,
				backgroundColor: "rgba(255, 234, 167, 0.15)",
				shadowColor: "#FFEAA7",
			};
		default:
			return {
				color: "#9E9E9E",
				gradient: ["#9E9E9E", "#757575"],
				icon: "ellipse" as const,
				backgroundColor: "rgba(158, 158, 158, 0.15)",
				shadowColor: "#9E9E9E",
			};
	}
};

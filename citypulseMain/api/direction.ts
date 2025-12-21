export async function getDirections(from: any, to: any) {
	const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${`${process.env.MAPBOX_TOKEN}`}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Mapbox API Error:", response.status, errorText);
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch error in getDirections:", error);
		return null;
	}
}

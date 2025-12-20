export async function getDirections(from: any, to: any) {
	const response = await fetch(
		`${`https://api.mapbox.com`}/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.MAPBOX_TOKEN}`,
	);
	const data = await response.json();

	return data;
}

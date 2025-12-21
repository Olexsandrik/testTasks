//Map integration.

export type DataTypeOfMarkers = {
	id: number;
	name: string;
	type: string;
	latitude: number;
	longitude: number;
	description?: string;
	image?: string;
	typeOfMarker?: string;
	color?: string;
};

export type MarkerConfig = {
	color: string;
	gradient: string[];
	icon: string;
	backgroundColor: string;
	shadowColor: string;
};

//Map integration

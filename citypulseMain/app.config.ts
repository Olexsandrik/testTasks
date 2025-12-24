import "dotenv/config";

export default {
	expo: {
		name: "citypulseMain",
		slug: "citypulseMain",
		extra: {
			MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
			BASE_URL: process.env.BASE_URL,
			BASE_URL_CATEGORIES: process.env.BASE_URL_CATEGORIES,
			SUPABASE_URL: process.env.SUPABASE_URL,
			PUBLISHABLE_API_KEY: process.env.PUBLISHABLE_API_KEY,
		},
	},
};

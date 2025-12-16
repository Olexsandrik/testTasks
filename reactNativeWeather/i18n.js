import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./internalization/en.json";
import uk from "./internalization/uk.json";

const resources = {
	en: { translation: en },
	uk: { translation: uk },
};

i18n
	.use(initReactI18next) // passes i18n instance to react-i18next
	.init({
		resources,
		lng: "en", // default language
		fallbackLng: "en", // fallback if translation is missing
		interpolation: {
			escapeValue: false, // React Native does not need this
		},
	});

export default i18n;

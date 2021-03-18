import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsDe from "./locales/de/translation.json";
import translationsEn from "./locales/en/translation.json";

const resources = {
	en: {
		translation: translationsEn,
	},
	de: {
		translation: translationsDe,
	},
};

i18n.use(initReactI18next).init({
	resources,
	debug: true,
	lng: navigator.language,
	fallbackLng: "en",
	nonExplicitWhitelist: true,
	load: "languageOnly",
	whitelist: ["de", "en"],
});

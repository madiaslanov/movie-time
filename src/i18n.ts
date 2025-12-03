import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import ruTranslation from "./locales/ru/translation.json";
import kzTranslation from "./locales/kz/translation.json";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: enTranslation,
            },
            ru: {
                translation: ruTranslation,
            },
            kz: {
                translation: kzTranslation,
            }
        },
    });

export default i18n;

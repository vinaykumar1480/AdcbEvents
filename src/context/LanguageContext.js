import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("app_lang");
      if (stored) {
        setLang(stored);
      }
      setInitialLoad(false);  // After loading stored language
    })();
  }, []);

  const toggleLanguage = async () => {
    const newLang = lang === "en" ? "ar" : "en";

    // Save new value
    await AsyncStorage.setItem("app_lang", newLang);
    setLang(newLang);

    // Apply RTL only on user action (not on initial load)
    const isRTL = newLang === "ar";

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      // Restart only once after user sets language
      setTimeout(() => {
        RNRestart.restart();
      }, 200);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {!initialLoad && children}
    </LanguageContext.Provider>
  );
}

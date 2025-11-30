import RNBootSplash from "react-native-bootsplash";
import '@react-native-firebase/app';
import '@react-native-firebase/auth';

import React, { useEffect } from "react";

import AuthProvider from "./src/context/AuthContext";
import LanguageProvider from "./src/context/LanguageContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </LanguageProvider>
  );
}

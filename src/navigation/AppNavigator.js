import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import BottomTabs from "./BottomTabs";

import { AuthContext } from "../context/AuthContext";
import FullMapScreen from "../components/FullMapScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, authLoading } = useContext(AuthContext);

  // Show splash while checking AsyncStorage
  if (authLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
          </>
        )}
        <Stack.Screen name="FullMap" component={FullMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

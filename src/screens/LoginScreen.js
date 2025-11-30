import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient"; // THEME GRID
import { AuthContext } from "../context/AuthContext";
import auth from "@react-native-firebase/auth";

import {
  isBiometricAvailable,
  authenticateBiometric,
} from "../utils/biometric";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // Check biometric sensor on mount
  useEffect(() => {
    (async () => {
      const available = await isBiometricAvailable();
      setBiometricEnabled(available);
    })();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      Alert.alert("Login Failed", result.error);
    }
  };

  const handleBiometricLogin = async () => {
    const available = await isBiometricAvailable();
    if (!available) {
      Alert.alert(
        "Biometric Unavailable",
        "Your device does not support biometrics"
      );
      return;
    }

    const authenticated = await authenticateBiometric();

    if (authenticated) {
      // This makes user NON-NULL → AppNavigator auto-loads MainTabs
      await auth().signInAnonymously();
      return;
    }

    Alert.alert("Login Failed", "Fingerprint authentication failed");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
          backgroundColor: "#FEF2F2",
        }}
      >
        {/* PAGE TITLE */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            marginBottom: 20,
            textAlign: "center",
            color: "#FF5E62",
          }}
        >
          City Pulse Events
        </Text>

        {/* ---------- THEME BACKGROUND GRID ---------- */}
        <LinearGradient
          colors={["#FF7A6E", "#FF5E62"]}
          style={{
            padding: 15,
            borderRadius: 15,
            elevation: 6,
          }}
        >
          {/* EMAIL INPUT */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginBottom: 30,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Login
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 30,
            }}
          >
            <Icon name="email" size={22} color="#FFF" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#EEE"
              value={email}
              onChangeText={setEmail}
              style={{
                flex: 1,
                padding: 12,
                color: "#FFF",
                fontSize: 14,
                marginLeft: 8,
              }}
            />
          </View>

          {/* PASSWORD INPUT */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Icon name="lock" size={22} color="#FFF" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#EEE"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={{
                flex: 1,
                padding: 12,
                color: "#FFF",
                fontSize: 14,
                marginLeft: 8,
              }}
            />

            {/* Password Show Icon */}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>

          {/* LOGIN BUTTON */}
          <TouchableOpacity onPress={handleLogin} style={{ marginTop: 40 }}>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingRight: 5,
                }}
              >
                Sign In
              </Text>
              <Icon name="login" size={22} color="#FFF" />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: "#FFF",
              fontSize: 14,
              fontWeight: "400",
              textAlign: "center",
              marginVertical: 15,
            }}
          >
            Or
          </Text>
          {/* BIOMETRIC LOGIN */}
          {biometricEnabled && (
            <TouchableOpacity
              onPress={handleBiometricLogin}
              style={{ marginTop: 0 }}
            >
              <View
                style={{
                  backgroundColor: "#FF5E62",
                  paddingBottom: 10,
                  borderRadius: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  Sign In with Fingerprint
                </Text>

                <Icon name="fingerprint" size={22} color="#FFF" />
              </View>
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* SIGNUP LINK */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FF5E62",
                fontSize: 15,
                fontWeight: "600",
                paddingRight: 5,
              }}
            >
              Create new account
            </Text>
            <Icon name="account-plus" size={20} color="#FF5E62" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
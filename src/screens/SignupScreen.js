import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../context/AuthContext";

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    const result = await signup(email.trim(), password.trim());

    if (result.success) {
      Alert.alert("Success", "Account created successfully!");
      //navigation.replace("Login");
    } else {
      Alert.alert("Signup Failed", result.error);
    }
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
        {/* TITLE */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 20,
            textAlign: "center",
            color: "#FF5E62",
          }}
        >
          Create Your Account
        </Text>

        {/* -------- THEME CARD GRID -------- */}
        <LinearGradient
          colors={["#FF7A6E", "#FF5E62"]}
          style={{
            padding: 20,
            borderRadius: 20,
            elevation: 6,
          }}
        >
          {/* SIGNUP HEADER */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginBottom: 30,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Sign Up
          </Text>

          {/* EMAIL */}
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
            <Icon name="email-outline" size={22} color="#FFF" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#EEE"
              autoCapitalize="none"
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

          {/* PASSWORD */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Icon name="lock-outline" size={22} color="#FFF" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#EEE"
              secureTextEntry
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
          </View>

          {/* SIGN UP BUTTON */}
          <TouchableOpacity onPress={handleSignup} style={{ marginTop: 40 }}>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
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
                Create Account
              </Text>
              <Icon name="account-plus" size={22} color="#FFF" />
            </View>
          </TouchableOpacity>
        </LinearGradient>

        {/* LOGIN LINK */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              textAlign: "center",
              color: "#FF5E62",
              fontSize: 15,
              marginTop: 20,
              fontWeight: "600",
            }}
          >
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
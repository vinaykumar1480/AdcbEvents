import React, { createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userData) => {
      setUser(userData);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.code };  // FIXED
    }
  };

  const signup = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().signOut();
      return { success: true };
    } catch (err) {
       return { success: false, error: err.code };
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

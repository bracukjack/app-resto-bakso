import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Theme";
import AuthNavigator from "./navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import AppNavigator from "./navigations/AppNavigator";

import { LogBox } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/store/authSlice";
import MyLoader from "@/components/shared/Loader";

// Hanya sembunyikan pesan spesifik
LogBox.ignoreLogs([
  "The action 'REPLACE' with payload", // Pesan error yang ingin Anda sembunyikan
]);

export default function Page() {
  // get token from async storage

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          dispatch(login({ token: storedToken }));
        }
      } catch (error) {
        console.error("Failed to load token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {loading ? (
          <MyLoader />
        ) : (
          <View style={styles.container}>
            {token ? <AppNavigator /> : <AuthNavigator />}
          </View>
        )}
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
  },
});

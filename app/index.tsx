import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Theme";
import AuthNavigator from "./navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import AppNavigator from "./navigations/AppNavigator";

import { LogBox } from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/store/authSlice";
import * as SplashScreen from "expo-splash-screen";

// Hanya sembunyikan pesan spesifik
LogBox.ignoreLogs(["The action 'REPLACE' with payload"]);

// Mencegah splash screen menghilang secara otomatis
SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [appReady, setAppReady] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Tunggu minimal 2 detik sebelum lanjut
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Ambil token dari AsyncStorage
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          dispatch(login({ token: storedToken }));
        }
      } catch (error) {
        console.error("Failed to load token:", error);
      } finally {
        setAppReady(true);
      }
    };

    prepareApp();
  }, [dispatch]);

  // Sembunyikan splash screen setelah aplikasi siap
  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null; // Biarkan splash screen tetap muncul sampai proses selesai
  }

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        onLayout={onLayoutRootView} // Panggil fungsi untuk menyembunyikan splash screen
      >
        <View style={styles.container}>
          {token ? <AppNavigator /> : <AuthNavigator />}
        </View>
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

import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Theme";
import AuthNavigator from "./navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AppNavigator from "./navigations/AppNavigator";

import { LogBox } from "react-native";

// Hanya sembunyikan pesan spesifik
LogBox.ignoreLogs([
  "The action 'REPLACE' with payload", // Pesan error yang ingin Anda sembunyikan
]);

export default function Page() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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

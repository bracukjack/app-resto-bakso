import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Theme";
import AuthNavigator from "./navigations/AuthNavigator";

export default function Page() {
  return (
    <View style={styles.container}>
      <AuthNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
  },
});

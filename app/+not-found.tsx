import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Provider } from "react-redux";
import store from "@/store";

export default function NotFoundScreen() {
  return (
    <>
      <Provider store={store}>
        <Stack.Screen options={{ title: "Oops!" }} />
        <ThemedView style={styles.container}>
          <ThemedText type="title">This screen doesn't exist.</ThemedText>
          <Link href="/" style={styles.link}>
            <ThemedText type="link">Go to home screen!</ThemedText>
          </Link>
        </ThemedView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

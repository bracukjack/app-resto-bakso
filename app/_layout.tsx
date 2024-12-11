import {
  DefaultTheme,
  NavigationContainer,
  NavigationIndependentTree,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import "react-native-reanimated";
import "../global.css";

import { Provider } from "react-redux";
import store from "@/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <NavigationIndependentTree>
        <GluestackUIProvider mode="light">
          <ThemeProvider value={DefaultTheme}>
            <Slot />
          </ThemeProvider>
        </GluestackUIProvider>
      </NavigationIndependentTree>
    </Provider>
  );
}

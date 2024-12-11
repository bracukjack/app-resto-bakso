import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={TabNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;

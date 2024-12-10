import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../(screen)/order";
import AccountScreen from "../(screen)/account";
import LoginScreen from "../(screen)/auth/login"; // Assuming you have a LoginScreen
import { Colors } from "@/constants/Theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
};

export type TabParamList = {
  Order: undefined;
  Account: undefined;
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Order"
    >
      <Tab.Screen
        options={{
          tabBarActiveTintColor: Colors.secondary,
        }}
        name="Order"
        component={OrderScreen}
      />
      <Tab.Screen
        options={{
          tabBarActiveTintColor: Colors.secondary,
        }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;

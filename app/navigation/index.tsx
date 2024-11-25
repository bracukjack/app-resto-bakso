import { Colors } from "@/constants/Theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderScreen from "../(screen)/order";
import AccountScreen from "../(screen)/account";

const Tab = createBottomTabNavigator();

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

export default MyTabs;

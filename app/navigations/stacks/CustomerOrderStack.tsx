import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerOrderScreen from "@/app/tabs/customer/order/CustomerOrderScreen";
import { RootStackParamList } from "../AuthNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomerOrderStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CustomerOrder" component={CustomerOrderScreen} />
  </Stack.Navigator>
);

export default CustomerOrderStack;

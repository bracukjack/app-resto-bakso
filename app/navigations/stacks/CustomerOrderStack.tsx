import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerOrderScreen from "@/app/tabs/customer/order/CustomerOrderScreen";
import { RootStackParamList } from "../AuthNavigator";
import OnGoingListScreen from "@/app/tabs/customer/account/transactionOnGoing/OnGoingListScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomerOrderStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="CustomerOrder"
      component={CustomerOrderScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OnGoingList"
      component={OnGoingListScreen}
      options={{ headerShown: true, title: "Transaction On Going List" }}
    />
  </Stack.Navigator>
);

export default CustomerOrderStack;

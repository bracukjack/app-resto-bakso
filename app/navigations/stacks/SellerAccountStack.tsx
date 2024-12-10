import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionListScreen from "@/app/tabs/seller/account/transaction/TransactionListScreen";
import TransactionDetailScreen from "@/app/tabs/seller/account/transaction/TransactionDetailScreen";
import RecapitulationListScreen from "@/app/tabs/seller/account/recapitulation/RecapitulationListScreen";
import { RootStackParamList } from "../AuthNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SellerAccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TransactionList" component={TransactionListScreen} />
    <Stack.Screen
      name="TransactionDetail"
      component={TransactionDetailScreen}
    />
    <Stack.Screen
      name="RecapitulationList"
      component={RecapitulationListScreen}
    />
    <Stack.Screen
      name="RecapitulationDetail"
      component={RecapitulationListScreen}
    />
  </Stack.Navigator>
);

export default SellerAccountStack;

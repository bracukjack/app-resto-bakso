import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionListScreen from "@/app/tabs/seller/account/transaction/TransactionListScreen";
import TransactionDetailScreen from "@/app/tabs/seller/account/transaction/TransactionDetailScreen";
import RecapitulationListScreen from "@/app/tabs/seller/account/recapitulation/RecapitulationListScreen";
import { RootStackParamList } from "../AuthNavigator";
import SellerAccountScreen from "@/app/tabs/seller/account/SellerAccountScreen";
import RecapitulationDetailScreen from "@/app/tabs/seller/account/recapitulation/RecapitulationDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SellerAccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SellerAccount" component={SellerAccountScreen} />
    <Stack.Screen
      name="TransactionList"
      component={TransactionListScreen}
      options={{ headerShown: true, title: "Transaction List" }}
    />
    <Stack.Screen
      name="TransactionDetail"
      component={TransactionDetailScreen}
      options={{ headerShown: true, title: "Transaction Detail" }}
    />
    <Stack.Screen
      name="RecapitulationList"
      component={RecapitulationListScreen}
      options={{ headerShown: true, title: "Recapitulation List" }}
    />
    <Stack.Screen
      name="RecapitulationDetail"
      component={RecapitulationDetailScreen}
      options={{ headerShown: true, title: "Recapitulation Detail" }}
    />
  </Stack.Navigator>
);

export default SellerAccountStack;

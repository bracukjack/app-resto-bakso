import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

export type RootStackParamList = {
  // Customer Account Screens
  EditProfile: undefined;
  ChangePassword: undefined;
  CustomerAccount: undefined;
  OnGoingList: undefined;
  OnGoingDetail: { transactionId: number };
  CompletedList: undefined;
  CompletedDetail: { transactionId: number };

  // customer order
  CustomerOrder: undefined;

  // seller order
  SellerOrder: undefined;
  EditBank: undefined;
  EditProduct: { productId: number };
  CreateDelivery: { deliveryId?: number };
  EditPromo: undefined;

  // seller account
  SellerAccount: undefined;
  EditSellerProfile: undefined;
  ChangePasswordSeller: undefined;
  TransactionList: undefined;
  TransactionHistory: undefined;
  TransactionDetail: { transactionId: number };
  RecapitulationList: undefined;
  RecapitulationDetail: { recapitulationDate: string };

  Tabs: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// navigation.ts

const AuthNavigator = () => {
  // const isAuthenticated = false;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true, title: "Register" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

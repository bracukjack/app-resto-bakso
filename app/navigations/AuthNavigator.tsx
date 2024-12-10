import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export type RootStackParamList = {
  Login: undefined;
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
  TransactionList: undefined;
  TransactionDetail: { transactionId: number };
  RecapitulationList: { recapitulationId: number };
  RecapitulationDetail: undefined;

  Tabs: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// navigation.ts

const AuthNavigator = () => {
  // const isAuthenticated = false;
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="Tabs" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: true, title: "Register" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
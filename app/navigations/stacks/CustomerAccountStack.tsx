import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnGoingListScreen from "@/app/tabs/customer/account/transactionOnGoing/OnGoingListScreen";
import OnGoingDetailScreen from "@/app/tabs/customer/account/transactionOnGoing/OnGoingDetailScreen";
import CompletedListScreen from "@/app/tabs/customer/account/transactionCompleted/CompleteListScreen";
import CompletedDetailScreen from "@/app/tabs/customer/account/transactionCompleted/CompletedDetailScreen";
import { RootStackParamList } from "../AuthNavigator";
import EditProfileScreen from "@/app/tabs/customer/account/EditProfileScreen";
import CustomerAccountScreen from "@/app/tabs/customer/account/CustomerAccountScreen";
import ChangePasswordScreen from "@/app/tabs/customer/account/ChangePasswordScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomerAccountStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, headerBackTitle: "Kembali" }}
  >
    <Stack.Screen
      name="CustomerAccount"
      component={CustomerAccountScreen}
      options={{ headerShown: true, title: "Akun Pembeli" }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ headerShown: true, title: "Edit Profil" }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ headerShown: true, title: "Ganti Kata Sandi" }}
    />
    <Stack.Screen
      name="OnGoingList"
      component={OnGoingListScreen}
      options={{ headerShown: true, title: "Transaksi Berlangsung" }}
    />
    <Stack.Screen
      name="OnGoingDetail"
      component={OnGoingDetailScreen}
      options={{ headerShown: true, title: "Transaksi Detail" }}
    />
    <Stack.Screen
      name="CompletedList"
      component={CompletedListScreen}
      options={{ headerShown: true, title: "Transaksi Selesai" }}
    />
    <Stack.Screen
      name="CompletedDetail"
      component={CompletedDetailScreen}
      options={{ headerShown: true, title: "Transaksi Detail" }}
    />
  </Stack.Navigator>
);

export default CustomerAccountStack;

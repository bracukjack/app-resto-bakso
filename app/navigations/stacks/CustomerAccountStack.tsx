import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnGoingListScreen from "@/app/tabs/customer/account/transactionOnGoing/OnGoingListScreen";
import OnGoingDetailScreen from "@/app/tabs/customer/account/transactionOnGoing/OnGoingDetailScreen";
import CompletedListScreen from "@/app/tabs/customer/account/transactionCompleted/CompleteListScreen";
import CompletedDetailScreen from "@/app/tabs/customer/account/transactionCompleted/CompletedDetailScreen";
import { RootStackParamList } from "../AuthNavigator";
import ChangePasswordScreen from "@/app/screens/auth/ChangePasswordScreen";
import EditProfileScreen from "@/app/tabs/customer/account/EditProfileScreen";
import CustomerAccountScreen from "@/app/tabs/customer/account/CustomerAccountScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomerAccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="CustomerAccount"
      component={CustomerAccountScreen}
      options={{ headerShown: true, title: "Customer Account" }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ headerShown: true, title: "Edit Profile" }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ headerShown: true, title: "Change Password" }}
    />
    <Stack.Screen
      name="OnGoingList"
      component={OnGoingListScreen}
      options={{ headerShown: true, title: "Transaction On Going List" }}
    />
    <Stack.Screen
      name="OnGoingDetail"
      component={OnGoingDetailScreen}
      options={{ headerShown: true, title: "Transaction On Going Detail" }}
    />
    <Stack.Screen
      name="CompletedList"
      component={CompletedListScreen}
      options={{ headerShown: true, title: "Transaction Completed List" }}
    />
    <Stack.Screen
      name="CompletedDetail"
      component={CompletedDetailScreen}
      options={{ headerShown: true, title: "Transaction Completed Detail" }}
    />
  </Stack.Navigator>
);

export default CustomerAccountStack;

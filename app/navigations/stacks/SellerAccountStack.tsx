import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionListScreen from "@/app/tabs/seller/account/transaction/TransactionListScreen";
import TransactionDetailScreen from "@/app/tabs/seller/account/transaction/TransactionDetailScreen";
import RecapitulationListScreen from "@/app/tabs/seller/account/recapitulation/RecapitulationListScreen";
import { RootStackParamList } from "../AuthNavigator";
import SellerAccountScreen from "@/app/tabs/seller/account/SellerAccountScreen";
import RecapitulationDetailScreen from "@/app/tabs/seller/account/recapitulation/RecapitulationDetailScreen";
import EditProfileScreen from "@/app/tabs/seller/account/EditProfileScreen";
import TransactionHistoryScreen from "@/app/tabs/seller/account/transaction/TransactionHistoryScreen";
import SellerChangePasswordScreen from "@/app/tabs/seller/account/SellerChangePasswordScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SellerAccountStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, headerBackTitle: "Kembali" }}
  >
    <Stack.Screen
      name="SellerAccount"
      component={SellerAccountScreen}
      options={{ headerShown: true, title: "Akun Penjual" }}
    />
    <Stack.Screen
      name="EditSellerProfile"
      component={EditProfileScreen}
      options={{ headerShown: true, title: "Edit Profil" }}
    />

    <Stack.Screen
      name="ChangePasswordSeller"
      component={SellerChangePasswordScreen}
      options={{ headerShown: true, title: "Ganti Kata Sandi" }}
    />

    <Stack.Screen
      name="TransactionList"
      component={TransactionListScreen}
      options={{ headerShown: true, title: "Daftar Transaksi" }}
    />

    <Stack.Screen
      name="TransactionHistory"
      component={TransactionHistoryScreen}
      options={{ headerShown: true, title: "Riwayat Transaksi" }}
    />

    <Stack.Screen
      name="TransactionDetail"
      component={TransactionDetailScreen}
      options={{ headerShown: true, title: "Detail Transaksi" }}
    />
    <Stack.Screen
      name="RecapitulationList"
      component={RecapitulationListScreen}
      options={{ headerShown: true, title: "Daftar Laporan" }}
    />
    <Stack.Screen
      name="RecapitulationDetail"
      component={RecapitulationDetailScreen}
      options={{ headerShown: true, title: "Detail Laporan" }}
    />
  </Stack.Navigator>
);

export default SellerAccountStack;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellerOrderScreen from "@/app/tabs/seller/order/SellerOrderScreen";
import { RootStackParamList } from "../AuthNavigator";
import EditProductScreen from "@/app/tabs/seller/order/produk/EditProductScreen";
import EditBankScreen from "@/app/tabs/seller/order/EditBankScreen";
import EditPromoScreen from "@/app/tabs/seller/order/delivery/EditPromoScreen";
import CreateDeliveryScreen from "@/app/tabs/seller/order/delivery/CreateDeliveryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SellerOrderStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SellerOrder" component={SellerOrderScreen} />
    <Stack.Screen
      name="EditProduct"
      component={EditProductScreen}
      options={{ headerShown: true, title: "Edit Product" }}
    />
    <Stack.Screen
      name="CreateDelivery"
      component={CreateDeliveryScreen}
      options={{ headerShown: true, title: "Create Delivery" }}
    />
    <Stack.Screen
      name="EditPromo"
      component={EditPromoScreen}
      options={{ headerShown: true, title: "Edit Promo" }}
    />
    <Stack.Screen
      name="EditBank"
      component={EditBankScreen}
      options={{ headerShown: true, title: "Edit Bank" }}
    />
  </Stack.Navigator>
);

export default SellerOrderStack;

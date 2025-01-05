import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { User } from "@/model/user";
import ApiService from "@/service/apiService";
import { RootStackParamList } from "./AuthNavigator";
import CustomerAccountStack from "./stacks/CustomerAccountStack";
import SellerAccountStack from "./stacks/SellerAccountStack";
import SellerOrderStack from "./stacks/SellerOrderStack";
import CustomerOrderStack from "./stacks/CustomerOrderStack";
import { Home, User2 } from "lucide-react-native";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MyLoader from "@/components/shared/Loader";
import { Colors } from "@/constants/Theme";
const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await ApiService.get("/profile");
      const data = response.data.data;

      if (data) {
        setProfile(data);
      } else {
        console.log("Profil tidak ditemukan atau respons tidak valid");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data profil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <MyLoader />;
  }

  return (
    <Tab.Navigator>
      {profile?.role === "pembeli" ? (
        <>
          <Tab.Screen
            name="CustomerOrder"
            component={CustomerOrderStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Home size={16} color={focused ? "blue" : "gray"} />
              ),
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarLabel: "Order",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="CustomerAccount"
            component={CustomerAccountStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <User2 size={16} color={focused ? "blue" : "gray"} />
              ),
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarLabel: "Akun",
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="SellerOrder"
            component={SellerOrderStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Home size={16} color={focused ? "blue" : "gray"} />
              ),
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarLabel: "Order",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="SellerAccount"
            component={SellerAccountStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <User2 size={16} color={focused ? "blue" : "gray"} />
              ),
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarLabel: "Akun",
              headerShown: false,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;

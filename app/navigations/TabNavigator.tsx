import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomerOrderScreen from "../tabs/customer/order/CustomerOrderScreen";
import SellerOrderScreen from "../tabs/seller/order/SellerOrderScreen";
import SellerAccountScreen from "../tabs/seller/account/SellerAccountScreen";
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

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await ApiService.get("/profile");
      const data = response.data.data;

      if (data) {
        setProfile(data);
      } else {
        console.log("Profile not found or invalid response");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

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
              tabBarLabel: "Account",
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
              tabBarLabel: "Account",
              headerShown: false,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;

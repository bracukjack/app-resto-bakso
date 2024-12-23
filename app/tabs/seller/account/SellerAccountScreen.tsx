import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import MenuLink from "@/components/shared/MenuLink";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/store/authSlice";
import { Alert, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { User } from "@/model/user";
import ApiService from "@/service/apiService";
import { A } from "@expo/html-elements";

const SellerAccountScreen = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<User | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  const onPressLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await handleLogout();
        },
      },
    ]);
  };
  const handleLogout = async () => {
    try {
      // Menghapus token dari AsyncStorage
      await AsyncStorage.removeItem("token");
      alert("Logout successful");

      // Menghapus informasi pengguna dari Redux
      dispatch(logout());
      navigation.replace("Login");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="w-full p-5 gap-5">
          <View className="flex flex-col gap-2 justify-center items-center">
            <View className="p-2 bg-slate-200 rounded-full">
              <User2 color={"gray"} size={100} />
            </View>
            <Text className="text-black font-semibold text-lg">
              {profile?.email}
            </Text>
            <Text className="text-black font-semibold text-lg">
              {profile?.nama}
            </Text>

            <Text className="text-black font-semibold text-lg">
              {profile?.alamat}
            </Text>
            <Text className="text-black font-semibold text-lg">
              {profile?.telepon}
            </Text>
          </View>
          <Divider className="my-0.5" />
          <MenuLink
            title={"EDIT PROFILE"}
            onPress={() => navigation.navigate("EditSellerProfile")}
          />
          <MenuLink
            title={"CHANGE PASSWORD"}
            onPress={() => navigation.navigate("ChangePasswordSeller")}
          />
          <MenuLink
            title={"TRANSAKSI HARI INI"}
            onPress={() => navigation.navigate("TransactionList")}
          />

          <MenuLink
            title={"HISTORY TRANSAKSI"}
            onPress={() => navigation.navigate("TransactionHistory")}
          />
          <MenuLink
            title={"LAPORAN REKAPITULASI"}
            onPress={() => navigation.navigate("RecapitulationList")}
          />
          <Button
            onPress={onPressLogout}
            className="flex flex-row gap-5 justify-start items-center"
            variant="link"
            action="negative"
          >
            <ButtonText>Logout</ButtonText>
            <ButtonIcon as={LogOut} />
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerAccountScreen;

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogOut, User } from "lucide-react-native";
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

const SellerAccountScreen = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
      <VStack className="w-full p-5 gap-5">
        {/* <View className="flex flex-col gap-2 justify-center items-center">
          <View className="p-2 bg-slate-200 rounded-full">
            <User size={100} />
          </View>
          <Text className="text-black font-semibold text-lg">
            Email penjual
          </Text>
          <Text className="text-black font-semibold text-lg">Nama penjual</Text>
        </View> */}
        <Divider className="my-0.5" />

        <MenuLink
          title={"LAPORAN TRANSAKSI"}
          onPress={() => navigation.navigate("TransactionList")}
        />
        <MenuLink
          title={"LAPORAN REKAPITULASI"}
          onPress={() => navigation.navigate("RecapitulationList")}
        />
        <Button
          onPress={handleLogout}
          className="flex flex-row gap-5 justify-start items-center"
          variant="link"
          action="negative"
        >
          <ButtonText>Logout</ButtonText>
          <ButtonIcon as={LogOut} />
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default SellerAccountScreen;

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import MenuLink from "@/components/shared/MenuLink";
import { useRouter } from "expo-router";
import { User } from "@/model/user";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation";

interface CustomerAccountProps {
  profile?: User;
}
const CustomerAccount = ({ profile }: CustomerAccountProps) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      // Menghapus token dari AsyncStorage
      await AsyncStorage.removeItem("token");
      alert("Logout successful");

      // Menghapus informasi pengguna dari Redux
      dispatch(logout());
      navigation.navigate("Login");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <VStack className="w-full p-5 gap-5">
      <View className="flex flex-col gap-2 justify-center items-center">
        <View className="p-2 bg-slate-200 rounded-full">
          <User2 size={100} />
        </View>
        <Text className="text-black font-semibold text-lg">
          {profile?.email}
        </Text>
        <Text className="text-black font-semibold text-lg">
          {profile?.nama}
        </Text>
      </View>
      <Divider className="my-0.5" />
      <MenuLink
        title={"EDIT PROFILE"}
        onPress={() => router.push("/(screen)/account/customer/profile")}
      />
      <MenuLink
        title={"CHANGE PASSWORD"}
        onPress={() => router.push("/auth/change-password")}
      />
      <MenuLink
        title={"TRANSACTION ONGOING"}
        onPress={() => router.push("/transaction-ongoing")}
      />
      <MenuLink
        title={"TRANSACTION COMPLETED"}
        onPress={() => router.push("/transaction-completed")}
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
  );
};

export default CustomerAccount;

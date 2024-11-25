import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogOut, User } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import MenuLink from "@/components/shared/MenuLink";
import { useRouter } from "expo-router";

const SellerAccount = () => {
  const router = useRouter();

  return (
    <VStack className="w-full p-5 gap-5">
      <View className="flex flex-col gap-2 justify-center items-center">
        <View className="p-2 bg-slate-200 rounded-full">
          <User size={100} />
        </View>
        <Text className="text-black font-semibold text-lg">Email penjual</Text>
        <Text className="text-black font-semibold text-lg">Nama penjual</Text>
      </View>
      <Divider className="my-0.5" />
      <MenuLink
        title={"CHANGE PASSWORD"}
        onPress={() => router.push("/auth/change-password")}
      />
      <MenuLink
        title={"LAPORAN TRANSAKSI"}
        onPress={() => router.push("/transaction-report")}
      />
      <MenuLink
        title={"LAPORAN REKAPITULASI"}
        onPress={() => router.push("/recapitulation-report")}
      />
      <Button
        onPress={() => router.push("/(screen)/auth/login")}
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

export default SellerAccount;

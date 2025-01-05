import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import MenuLink from "@/components/shared/MenuLink";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/store/authSlice";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/model/user";
import ApiService from "@/service/apiService";
import MyLoader from "@/components/shared/Loader";
import { HStack } from "@/components/ui/hstack";

const SellerAccountScreen = () => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState<User | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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

  const onPressLogout = () => {
    Alert.alert("Keluar", "Apakah Anda Yakin Untuk Keluar/Ganti Akun?", [
      {
        text: "KEMBALI",
        style: "cancel",
      },
      {
        text: "LANJUTKAN",
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
      await AsyncStorage.removeItem("email");
      alert("Anda Berhasil Keluar");

      // Menghapus informasi pengguna dari Redux
      dispatch(logout());
      navigation.replace("Login");
    } catch (error) {
      console.error("Kesalahan saat logout:", error);
    }
  };

  return loading ? (
    <MyLoader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["blue"]}
        />
      }
    >
      <VStack className="w-full p-5 gap-5">
        <HStack className="items-center gap-2">
          <View className="p-2 bg-slate-200 rounded-full">
            <User2 color={"gray"} size={80} />
          </View>
          <View>
            <Text className="text-black font-medium text-base">
              {profile?.nama}
            </Text>
            <Text className="text-black font-medium text-base">
              {profile?.email}
            </Text>
            <Text className="text-black font-medium text-base">
              {profile?.alamat}
            </Text>
            <Text className="text-black font-medium text-base">
              {profile?.telepon}
            </Text>
          </View>
        </HStack>

        <Divider className="my-0.5" />
        <MenuLink
          title={"EDIT PROFIL"}
          onPress={() => navigation.navigate("EditSellerProfile")}
        />
        <MenuLink
          title={"GANTI KATA SANDI"}
          onPress={() => navigation.navigate("ChangePasswordSeller")}
        />
        <MenuLink
          title={"TRANSAKSI HARI INI"}
          onPress={() => navigation.navigate("TransactionList")}
        />

        <MenuLink
          title={"RIWAYAT TRANSAKSI"}
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
          <ButtonText>KELUAR</ButtonText>
          <ButtonIcon as={LogOut} />
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default SellerAccountScreen;

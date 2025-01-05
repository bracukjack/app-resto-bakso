import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import ApiService from "@/service/apiService";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLoader from "@/components/shared/Loader";

const EditPromoScreen = () => {
  const [persyaratanPromo, setPersyaratanPromo] = useState<string>("");
  const [promoId, setPromoId] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);

  const fetchPromo = async () => {
    try {
      const response = await ApiService.get("/promo");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        const promo = data[0];
        setPromoId(promo.id);
        setPersyaratanPromo(promo.syarat_promo || "");
      }
    } catch (error) {
      console.error("Error fetching promo:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    try {
      // Jika form valid
      const token = await AsyncStorage.getItem("token");
      if (persyaratanPromo) {
        const response = await ApiService.put(
          "/promo/" + promoId,
          { syarat_promo: persyaratanPromo },
          token as string
        );

        if (response.status === 200) {
          Alert.alert("Berhasil", "Kode Promo berhasil diperbaharui.", [
            {
              text: "OK",
              onPress: () => navigation.navigate("SellerOrder"),
            },
          ]);
        } else {
          Alert.alert("Error", "Gagal memperbaharui kode promo, Coba lagi.");
        }
      } else {
        Alert.alert("Error", "Tolong isi kolom Kode Promo.");
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat memperbarui promo..");
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return loading ? (
    <MyLoader />
  ) : (
    <VStack space="xl" className="p-5">
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Kode Promo"
          value={persyaratanPromo}
          onChangeText={setPersyaratanPromo}
        />
      </Input>

      <Button className="bg-cyan-600" size="sm" onPress={handleSubmit}>
        <ButtonText>Simpan</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditPromoScreen;

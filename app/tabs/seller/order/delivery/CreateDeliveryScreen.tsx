import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ApiService from "@/service/apiService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLoader from "@/components/shared/Loader";
import { Delivery } from "@/model/delivery";

type CreateDeliveryProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateDelivery"
>;
const CreateDeliveryScreen = ({ route }: CreateDeliveryProps) => {
  const { deliveryId } = route.params || {}; // Kondisi optional untuk deliveryId
  const [hargaDelivery, setHargaDelivery] = useState<number>(0);
  const [kabupaten, setKabupaten] = useState<string>("");
  const [delivery, setDelivery] = useState<Delivery>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);

  const fetchDelivery = async () => {
    if (!deliveryId) return; // Hanya fetch jika deliveryId ada

    try {
      const response = await ApiService.get("/delivery");
      const data = response.data?.data;

      if (Array.isArray(data)) {
        const delivery = data.find((item) => item.id === deliveryId);
        setHargaDelivery(delivery?.harga || 0);
        setKabupaten(delivery?.nama_daerah || "");
        setDelivery(delivery);
      }
    } catch (error) {
      console.error("Error fetching delivery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const payload = {
        kabupaten: kabupaten,
        harga: hargaDelivery,
      };

      // Tentukan apakah PUT (edit) atau POST (create)
      const response = deliveryId
        ? await ApiService.put(
            `/delivery/${deliveryId}`,
            payload,
            token as string
          )
        : await ApiService.post("/delivery", payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Berhasil",
          `Delivery berhasil ${deliveryId ? "diperbaharui" : "ditambahkan"} .`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("SellerOrder"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          `Gagal saat ${deliveryId ? "update" : "menambahkan"} data Delivery.`
        );
      }
    } catch (error) {
      console.error(
        `Error ${deliveryId ? "updating" : "menambahkan"} Delivery:`,
        error
      );
      Alert.alert(
        "Error",
        `Terjadi kesalahan saat ${
          deliveryId ? "update" : "menambahkan"
        } data Delivery.`
      );
    }
  };

  useEffect(() => {
    fetchDelivery();
  }, []);

  return loading ? (
    <MyLoader />
  ) : (
    <VStack space="xl" className="p-5">
      <Text className="font-bold text-black">
        Kabupaten {delivery?.nama_daerah}
      </Text>
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Harga Delivery"
          value={(hargaDelivery || 0).toString()}
          onChangeText={(text) => setHargaDelivery(Number(text))}
        />
      </Input>

      <Button className="bg-cyan-600" size="sm" onPress={handleSubmit}>
        <ButtonText>Simpan</ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateDeliveryScreen;

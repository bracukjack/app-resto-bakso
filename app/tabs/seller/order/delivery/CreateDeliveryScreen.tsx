import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ApiService from "@/service/apiService";
import { RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { set } from "mobx";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react-native";
import { kabupatenOptions } from "@/constants/Kabupaten";

type CreateDeliveryProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateDelivery"
>;
const CreateDeliveryScreen = ({ route }: CreateDeliveryProps) => {
  const { deliveryId } = route.params || {}; // Kondisi optional untuk deliveryId
  const [namaDaerah, setNamaDaerah] = useState("");
  const [hargaDelivery, setHargaDelivery] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token } = useSelector((state: RootState) => state.auth);

  const fetchDelivery = async () => {
    if (!deliveryId) return; // Hanya fetch jika deliveryId ada

    try {
      const response = await ApiService.get("/delivery");
      const data = response.data?.data;

      if (Array.isArray(data)) {
        const delivery = data.find((item) => item.id === deliveryId);
        setNamaDaerah(delivery?.nama_daerah || "");
        setHargaDelivery(delivery?.harga || "");
      }
    } catch (error) {
      console.error("Error fetching delivery:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!token) {
        console.error("No token found.");
        return;
      }

      // Validasi form
      if (!namaDaerah || !hargaDelivery) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const payload = {
        nama_daerah: namaDaerah,
        harga: hargaDelivery,
      };

      // Tentukan apakah PUT (edit) atau POST (create)
      const response = deliveryId
        ? await ApiService.put(`/delivery/${deliveryId}`, payload, token)
        : await ApiService.post("/delivery", payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Success",
          `Delivery ${deliveryId ? "updated" : "created"} successfully.`,
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
          `Failed to ${deliveryId ? "update" : "create"} Delivery.`
        );
      }
    } catch (error) {
      console.error(
        `Error ${deliveryId ? "updating" : "creating"} Delivery:`,
        error
      );
      Alert.alert(
        "Error",
        `An error occurred while ${
          deliveryId ? "updating" : "creating"
        } the Delivery.`
      );
    }
  };

  useEffect(() => {
    fetchDelivery();
  }, [deliveryId]);

  return (
    <VStack space="xl" className="p-5">
      <Select onValueChange={setNamaDaerah}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select Kabupaten" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            {kabupatenOptions.map((option) => (
              <SelectItem
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>

      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="HARGA"
          value={hargaDelivery}
          onChangeText={setHargaDelivery}
        />
      </Input>

      <Button className="bg-cyan-600" size="sm" onPress={handleSubmit}>
        <ButtonText>{deliveryId ? "Update" : "Create"}</ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateDeliveryScreen;

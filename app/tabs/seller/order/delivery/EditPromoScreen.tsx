import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import ApiService from "@/service/apiService";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";

const EditPromoScreen = () => {
  const [persyaratanPromo, setPersyaratanPromo] = useState<string>("");
  const [promoId, setPromoId] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchPromo = async () => {
    try {
      if (!token) {
        console.error("No token found.");
        return;
      }

      const response = await ApiService.get("/promo");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        const promo = data[0];
        setPromoId(promo.id);
        setPersyaratanPromo(promo.syarat_promo || "");
      }
    } catch (error) {
      console.error("Error fetching promo:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      if (!token) {
        console.error("No token found.");
        return;
      }

      // Jika form valid
      if (persyaratanPromo) {
        const response = await ApiService.put(
          "/promo/" + promoId,
          { syarat_promo: persyaratanPromo },
          token
        );

        if (response.status === 200) {
          Alert.alert("Success", "Promo updated successfully.", [
            {
              text: "OK",
              onPress: () => navigation.navigate("SellerOrder"),
            },
          ]);
        } else {
          Alert.alert("Error", "Failed to update promo.");
        }
      } else {
        Alert.alert("Error", "Please fill in the promo requirements.");
      }
    } catch (error) {
      console.error("Error updating promo:", error);
      Alert.alert("Error", "An error occurred while updating the promo.");
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return (
    <VStack space="xl" className="p-5">
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="PERSYARATAN PROMO"
          value={persyaratanPromo}
          onChangeText={setPersyaratanPromo}
        />
      </Input>

      <Button className="bg-cyan-600" size="sm" onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditPromoScreen;

import Header from "@/components/shared/Header";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import ApiService from "@/service/apiService";
import { Transfer } from "@/model/transfer";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";

const EditBankScreen = () => {
  const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
  const [bankAccountName, setBankAccountName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [transferId, setTransferId] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchTransfer = async () => {
    try {
      const response = await ApiService.get("/transfer");
      const data = response.data?.data;

      if (Array.isArray(data) && data.length > 0) {
        const account = data[0];
        setTransferId(account.id);
        setBankAccountNumber(account.nomor_rekening || "");
        setBankAccountName(account.atas_nama || "");
        setBankName(account.nama_bank || "");
      }
    } catch (error) {
      console.error("Error fetching transfer:", error);
    }
  };

  const handleSubmit = async () => {
    if (!transferId) {
      Alert.alert("Error", "No bank account to update.");
      return;
    }

    if (!bankAccountNumber || !bankAccountName || !bankName) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      if (!token) {
        Alert.alert("Error", "No token found. Please login again.");
        return;
      }

      const response = await ApiService.put(
        `/transfer/${transferId}`,
        {
          nama_bank: bankName,
          nomor_rekening: bankAccountNumber,
          atas_nama: bankAccountName,
        },
        token
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Bank account updated successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("SellerOrder"),
          },
        ]);
      } else {
        Alert.alert("Error", "Failed to update bank account.");
      }
    } catch (error) {
      console.error("Error updating bank account:", error);
      Alert.alert(
        "Error",
        "An error occurred while updating the bank account."
      );
    }
  };

  useEffect(() => {
    fetchTransfer();
  }, []);

  return (
    <VStack space="xl" className="p-5">
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Bank Account Number"
          value={bankAccountNumber}
          onChangeText={setBankAccountNumber}
        />
      </Input>

      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Bank Account Name"
          value={bankAccountName}
          onChangeText={setBankAccountName}
        />
      </Input>
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChangeText={setBankName}
        />
      </Input>

      <Button onPress={handleSubmit} className="bg-cyan-600" size="sm">
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditBankScreen;

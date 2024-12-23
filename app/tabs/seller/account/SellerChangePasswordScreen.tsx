import React from "react";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import ApiService from "@/service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { Alert } from "react-native";

const SellerChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null); // Reset error
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const response = await ApiService.put(
        "/change-password",
        {
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        },
        token
      );

      if (response.status === 200 || response.status === 201) {
        // Handle success, misalnya redirect ke halaman profile
        Alert.alert("Sukses", "Password berhasil diupdate!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("SellerAccount"),
          },
        ]);
      } else {
        console.log("Failed to change password:");
      }
    } catch (error) {
      setError("An error occurred while changing password.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Center>
        <Box className="p-5 w-full">
          <VStack className="pb-4" space="xs">
            <Heading className="leading-[30px]">Set new password</Heading>
          </VStack>
          <VStack space="xl" className="py-2">
            <Input className="border focus:border-cyan-600">
              <InputField
                className="py-2"
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </Input>
            <Input className="border focus:border-cyan-600">
              <InputField
                className="py-2"
                type="text"
                placeholder="Confirm Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
              />
            </Input>
          </VStack>

          <VStack space="lg" className="pt-4">
            <Button size="sm" onPress={handleChangePassword}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default SellerChangePasswordScreen;

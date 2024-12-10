import Header from "@/components/shared/Header";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import ApiService from "@/service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePasswordScreen = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

      if (response.status === 200) {
        // Handle success, misalnya redirect ke halaman profile
        alert("Password changed successfully!");
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
    <SafeAreaView>
      <Center>
        <Box className="p-5 w-full">
          <VStack className="pb-4" space="xs">
            <Heading className="leading-[30px]">Set new password</Heading>
          </VStack>
          <VStack space="xl" className="py-2">
            <Input className="border focus:border-cyan-600">
              <InputField
                className="py-2 lowercase"
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </Input>
            <Input className="border focus:border-cyan-600">
              <InputField
                className="py-2 lowercase"
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
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

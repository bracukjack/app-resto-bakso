import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <SafeAreaView>
      <Center className="bg-white h-screen w-screen flex flex-col gap-5 px-10">
        <Box className="p-5 w-full rounded-lg">
          <VStack className="pb-4" space="xs">
            <View className="flex flex-col items-center gap-2">
              <Text className="text-cyan-600 font-bold text-5xl">DAFTAR </Text>
              <Text className="text-cyan-600 font-bold text-5xl">SEBAGAI </Text>
              <Button isPressed size="xl" variant="solid" action="positive">
                <ButtonText className="text-white">PEMBELI</ButtonText>
              </Button>
            </View>
          </VStack>
          <VStack space="xl" className="py-2">
            <Input className=" border focus:border-cyan-600">
              <InputField className="py-2" type="text" placeholder="Alamat" />
            </Input>

            <Input className=" border focus:border-cyan-600">
              <InputField
                className="py-2"
                type="text"
                placeholder="Number Telephone"
              />
            </Input>
            <Input className=" border focus:border-cyan-600">
              <InputField className="py-2" type="text" placeholder="Email" />
            </Input>
            <Input className=" border focus:border-cyan-600">
              <InputField
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className="text-darkBlue-500"
                />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="lg" className="pt-4">
            <Button className="bg-cyan-600" size="sm">
              <ButtonText>Submit</ButtonText>
            </Button>
            <Box className="flex flex-row">
              <Button onPress={() => router.back()} variant="link" size="md">
                <ButtonIcon className="mr-1" size="md" as={ArrowLeftIcon} />
                <ButtonText>Back to login</ButtonText>
              </Button>
            </Box>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default RegisterScreen;

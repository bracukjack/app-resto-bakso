import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Center className="bg-white h-screen w-screen flex flex-col gap-5 px-10">
        <Box className="p-5 w-full rounded-lg">
          <VStack className="pb-4" space="xs">
            <View className="flex flex-col items-center gap-2">
              <Text className="text-cyan-600 font-bold text-5xl">LOGIN </Text>
              <Text className="text-cyan-600 font-bold text-5xl">SEBAGAI </Text>
              <Button isPressed size="xl" variant="solid" action="positive">
                <ButtonText className="text-white">PENJUAL</ButtonText>
              </Button>
            </View>
          </VStack>
          <VStack space="xl" className="py-2">
            <Input className=" border focus:border-cyan-600">
              <InputField className="py-2" type="text" placeholder="Email" />
            </Input>
            <Input className=" border focus:border-cyan-600">
              <InputField
                className="py-2"
                type="password"
                placeholder="Password"
              />
            </Input>
          </VStack>
          <VStack space="lg" className="pt-4">
            <Button className="bg-cyan-600" size="sm">
              <ButtonText>Submit</ButtonText>
            </Button>
            <Box className="flex flex-col items-center justify-center">
              <Text>Don't have an account?</Text>
              <Button
                onPress={() => router.push("/auth/register")}
                variant="link"
                size="md"
              >
                <ButtonText className="underline">Register</ButtonText>
              </Button>
            </Box>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;

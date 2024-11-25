import Header from "@/components/shared/Header";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePasswordScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Center>
        <Box className="p-5 w-full">
          <Header
            onBack={() => router.push("/(screen)/account")}
            title="Change Password"
          />
          <VStack className="pb-4" space="xs">
            <Heading className="leading-[30px]">Set new password</Heading>
          </VStack>
          <VStack space="xl" className="py-2">
            <Input>
              <InputField className="py-2" placeholder="New password" />
            </Input>
            <Input>
              <InputField className="py-2" placeholder="Confirm new password" />
            </Input>
          </VStack>
          <VStack space="lg" className="pt-4">
            <Button size="sm">
              <ButtonText>Submit</ButtonText>
            </Button>
            <Box className="flex flex-row">
              <Button
                onPress={() => router.back()}
                variant="link"
                size="sm"
                className="p-0"
              >
                <ButtonIcon className="mr-1" size="md" as={ArrowLeftIcon} />
                <ButtonText>Back</ButtonText>
              </Button>
            </Box>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

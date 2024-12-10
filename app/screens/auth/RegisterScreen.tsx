import Header from "@/components/shared/Header";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import ApiService from "@/service/apiService";
import kabupatenBali from "@/app/data/kabupaten";

const RegisterScreen = () => {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [telepon, setTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSubmit = async () => {
    const userData = {
      nama,
      alamat,
      telepon,
      email,
      password,
      kabupaten,
    };
    try {
      const response = await ApiService.register(userData);
      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Success",
          "Registration successful! Silahkan login untuk melanjutkan",
          [
            {
              text: "OK",
              onPress: () => router.push("/(screen)/auth/login"),
            },
          ]
        );
      } else {
        alert("Registration failed! Email Sudah Terdaftar!");
      }
    } catch (error) {
      alert("An error occurred during registration.");
    }
  };

  return (
    <SafeAreaView>
      <Box className="p-5 w-full">
        <Center className="flex flex-col gap-5 px-2">
          <Box className="p-5 w-full rounded-lg">
            <VStack className="pb-4" space="xs">
              <View className="flex flex-col items-center gap-2">
                <Text className="text-cyan-600 font-bold text-5xl">DAFTAR</Text>
                <Text className="text-cyan-600 font-bold text-5xl">
                  SEBAGAI
                </Text>
                <Button isPressed size="xl" variant="solid" action="positive">
                  <ButtonText className="text-white">PEMBELI</ButtonText>
                </Button>
              </View>
            </VStack>

            <VStack space="xl" className="py-2">
              <Input className="border focus:border-cyan-600">
                <InputField
                  className="py-2"
                  type="text"
                  placeholder="Nama"
                  value={nama}
                  onChangeText={setNama}
                />
              </Input>

              <Input className="border focus:border-cyan-600">
                <InputField
                  className="py-2"
                  type="text"
                  placeholder="Alamat"
                  value={alamat}
                  onChangeText={setAlamat}
                />
              </Input>

              <Select onValueChange={setKabupaten}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Kabupaten" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    {kabupatenBali.map((kabupaten: any) => (
                      <SelectItem
                        key={kabupaten.value}
                        label={kabupaten.label}
                        value={kabupaten.value}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Input className="border focus:border-cyan-600">
                <InputField
                  className="py-2"
                  type="text"
                  placeholder="Nomor Telepon"
                  value={telepon}
                  onChangeText={setTelepon}
                />
              </Input>

              <Input className="border focus:border-cyan-600">
                <InputField
                  className="py-2 lowercase"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
              </Input>

              <Input className="border focus:border-cyan-600">
                <InputField
                  className="py-2"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChangeText={setPassword}
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
              <Button className="bg-cyan-600" size="sm" onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
              </Button>
              {/* <Box className="flex flex-row">
                <Button onPress={() => router.back()} variant="link" size="md">
                  <ButtonIcon className="mr-1" size="md" as={ArrowLeftIcon} />
                  <ButtonText>Back to login</ButtonText>
                </Button>
              </Box> */}
            </VStack>
          </Box>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default RegisterScreen;

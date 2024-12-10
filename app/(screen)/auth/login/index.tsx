import { Colors } from "@/constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ApiService from "@/service/apiService";
import { login, logout } from "@/store/authSlice";
import { Provider, useDispatch } from "react-redux";
import store from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const response = await ApiService.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const { token } = response.data;

        alert("Login Successful");

        // Simpan token ke Redux
        dispatch(login({ email, token }));

        // Simpan token ke AsyncStorage
        await AsyncStorage.setItem("token", token);

        navigation.navigate("Tabs");
      } else {
        alert("Login failed, Invalid credentials!");
        console.log("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Center className="bg-white h-screen items-center flex flex-col gap-5 px-10">
          <Box className="p-5 w-full rounded-lg">
            <VStack className="pb-4" space="xs">
              <View className="flex flex-col items-center gap-2">
                <Text className="text-cyan-600 font-bold text-5xl">LOGIN</Text>
              </View>
            </VStack>

            <VStack space="xl" className="py-2">
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </Input>
            </VStack>

            <VStack space="lg" className="pt-4">
              <Button className="bg-cyan-600" size="sm" onPress={handleLogin}>
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
    </Provider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
  },
});

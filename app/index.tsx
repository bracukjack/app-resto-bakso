import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useRouter } from "expo-router";
import MyTabs from "./navigation";
import { Colors } from "@/constants/Theme";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MyTabs />
    </View>
    // <SafeAreaView style={styles.container}>
    //   <Center className="bg-white h-screen w-screen flex flex-col gap-5">
    //     <View className="flex flex-col items-center gap-2">
    //       <Text className="text-cyan-600 font-bold text-5xl">DAFTAR </Text>
    //       <Text className="text-cyan-600 font-bold text-5xl">SEBAGAI </Text>
    //     </View>

    //     <Box className="flex flex-col gap-3">
    //       <Button
    //         onPress={() => router.push("/auth/login")}
    //         size="xl"
    //         variant="outline"
    //         action="positive"
    //       >
    //         <ButtonText className="text-cyan-600">PENJUAL</ButtonText>
    //       </Button>

    //       <Button
    //         onPress={() => router.push("/auth/login")}
    //         size="xl"
    //         variant="outline"
    //         action="positive"
    //       >
    //         <ButtonText className="text-cyan-600">PEMBELI</ButtonText>
    //       </Button>
    //     </Box>
    //   </Center>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    height: "100%",
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
  },
});

import menuData from "@/app/data/menuDummy";
import ongkirData from "@/app/data/ongkirDummy";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import MenuList from "@/components/shared/MenuList";
import OngkirComponent from "@/components/shared/OngkirComponent";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Pressable } from "@/components/ui/pressable";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constants/Theme";
import { Delivery } from "@/model/delivery";
import { Product } from "@/model/product";
import { Promo } from "@/model/promo";
import { Transfer } from "@/model/transfer";
import ApiService from "@/service/apiService";
import { formatRupiah } from "@/utils/formatCurrency";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import { Edit, Plus } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SellerOrderScreen = () => {
  const [menu, setMenu] = useState<Product[]>([]);
  const [delivery, setDelivery] = useState<Delivery[]>([]);
  const [transfer, setTransfer] = useState<Transfer[]>([]);
  const [promo, setPromo] = useState<Promo[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mendapatkan status toko dari API
  const fetchShopStatus = async () => {
    try {
      const response = await ApiService.get("/setting-buka-toko");
      const data = response.data?.data;

      console.log("data", data);
      if (data.value === "1") {
        setIsShopOpen(true);
      } else {
        setIsShopOpen(false);
      }
    } catch (error) {
      console.error("Error fetching shop status:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("isShopOpen", isShopOpen);

  const toggleShopStatus = async (newStatus: any) => {
    try {
      setLoading(true);
      await ApiService.post(
        `/setting-buka-toko?buka=${newStatus ? "1" : "0"}`,
        {}
      );
      console.log("newStatus", newStatus);

      setIsShopOpen(newStatus);
    } catch (error) {
      console.error("Error updating shop status:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await ApiService.get("/produk");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setMenu(data);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const fetchPromo = async () => {
    try {
      const response = await ApiService.get("/promo");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setPromo(data);
      }
    } catch (error) {
      console.error("Error fetching delivery:", error);
    }
  };

  const fetchTransfer = async () => {
    try {
      const response = await ApiService.get("/transfer");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setTransfer(data);
      }
    } catch (error) {
      console.error("Error fetching delivery:", error);
    }
  };

  const fetchDelivery = async () => {
    try {
      const response = await ApiService.get("/delivery");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setDelivery(data);
      }
    } catch (error) {
      console.error("Error fetching delivery:", error);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchShopStatus(),
      fetchMenu(),
      fetchPromo(),
      fetchTransfer(),
      fetchDelivery(),
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [])
  );

  return (
    <SafeAreaView>
      <VStack className="w-full p-5 gap-5">
        <Card className="p-2 flex flex-row items-center justify-center gap-2 rounded-md bg-gray-300 shadow-md">
          <Text className="text-gray-700 text-lg font-bold">
            TOMBOL BUKA / TUTUP
          </Text>

          <Switch
            size="md"
            isDisabled={false}
            trackColor={{ false: Colors.grey, true: Colors.success }}
            thumbColor={Colors.silver}
            ios_backgroundColor={Colors.grey}
            value={isShopOpen}
            onValueChange={(value) => toggleShopStatus(value)}
          />
        </Card>

        <ScrollView className="h-full">
          <Box className="flex flex-col gap-5">
            <View>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-black mb-3 text-2xl font-bold ">
                  KELOLA PRODUK
                </Text>
              </View>

              <Grid className="" _extra={{ className: "grid-cols-4" }}>
                {menu.map((item, index) => (
                  <GridItem _extra={{ className: "w-fit " }} key={index}>
                    <MenuList
                      image={item.gambar_url}
                      title={item.nama_produk}
                      price={item.harga}
                      stok={item.stok}
                      onPress={() =>
                        navigation.navigate("EditProduct", {
                          productId: item.id,
                        })
                      }
                    />
                  </GridItem>
                ))}
              </Grid>
            </View>

            <View>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-black mb-3 text-2xl font-bold">
                  KELOLA DELIVERY
                </Text>
                <Button
                  onPress={() => navigation.navigate("CreateDelivery", {})}
                  action="positive"
                  variant="link"
                >
                  <ButtonText>Add</ButtonText>
                  <ButtonIcon as={Plus} />
                </Button>
              </View>

              <Grid _extra={{ className: "grid-cols-2" }}>
                {delivery.map((item, index) => (
                  <GridItem
                    className="p-1"
                    _extra={{ className: "w-fit" }}
                    key={index}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("CreateDelivery", {
                          deliveryId: item.id,
                        })
                      }
                    >
                      <OngkirComponent
                        city={item.nama_daerah}
                        price={item.harga}
                      />
                    </Pressable>
                  </GridItem>
                ))}
              </Grid>
            </View>

            <View>
              <Text className="text-black mb-3 text-2xl font-bold">
                KELOLA PROMO CODE
              </Text>
              <Button
                onPress={() => navigation.navigate("EditPromo")}
                size="xl"
                variant="outline"
                className="bg-slate-300 border border-cyan-500 rounded-2xl shadow-sm"
              >
                <ButtonText className=" flex flex-col items-center justify-center text-md italic	">
                  {promo[0]?.syarat_promo}
                </ButtonText>
              </Button>
            </View>

            <View>
              <Text className="text-black mb-3 text-2xl font-bold">
                KELOLA TRANSFER
              </Text>

              <Card className="bg-slate-300 border w-full flex gap-3 border-cyan-500 rounded-2xl shadow-sm">
                <View className="flex flex-col">
                  <Text className="text-black text-md italic">
                    {transfer[0]?.nomor_rekening}
                  </Text>
                  <Text className="text-black text-md italic">
                    {transfer[0]?.atas_nama}
                  </Text>
                </View>

                <View className="flex flex-row w-full justify-between items-center">
                  <Text className=" text-black text-md font-bold ">
                    {transfer[0]?.nama_bank}
                  </Text>

                  <Button
                    onPress={() => navigation.navigate("EditBank")}
                    size="lg"
                    variant="link"
                  >
                    <ButtonText className="text-red-500">EDIT</ButtonText>
                    <ButtonIcon className="text-red-500" as={Edit} />
                  </Button>
                </View>
              </Card>
            </View>
          </Box>
          <View style={{ height: 200 }}>
            <Divider />
          </View>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default SellerOrderScreen;

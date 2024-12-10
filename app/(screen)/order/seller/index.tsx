import menuData from "@/app/data/menuDummy";
import ongkirData from "@/app/data/ongkirDummy";
import MenuList from "@/components/shared/MenuList";
import MyAlert from "@/components/shared/MyAlert";
import OngkirComponent from "@/components/shared/OngkirComponent";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constants/Theme";
import { Delivery } from "@/model/delivery";
import { Product } from "@/model/product";
import ApiService from "@/service/apiService";
import { formatRupiah } from "@/utils/formatCurrency";
import { useRouter } from "expo-router";
import { Edit, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const SellerOrder = () => {
  const [menu, setMenu] = useState<Product[]>([]);
  const [delivery, setDelivery] = useState<Delivery[]>([]);
  const [alert, setAlert] = useState<string>("");

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

  useEffect(() => {
    fetchMenu();
    fetchDelivery();
  }, []);

  const ongkir = ongkirData;

  const router = useRouter();

  return (
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
        />
      </Card>

      <ScrollView className="h-full">
        <Box className="flex flex-col gap-5">
          <View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-black mb-3 text-3xl font-bold">
                KELOLA PRODUK
              </Text>
              <Button action="positive" variant="link">
                <ButtonText>Add</ButtonText>
                <ButtonIcon as={Plus} />
              </Button>
            </View>

            <Grid className="gap-1" _extra={{ className: "grid-cols-4" }}>
              {menu.map((item, index) => (
                <GridItem _extra={{ className: "w-fit" }} key={index}>
                  <MenuList
                    image={item.gambar_url}
                    title={item.nama_produk}
                    price={formatRupiah(item.harga)}
                  />
                </GridItem>
              ))}
            </Grid>
          </View>

          <View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-black mb-3 text-3xl font-bold">
                KELOLA Delivery
              </Text>
              <Button action="positive" variant="link">
                <ButtonText>Add</ButtonText>
                <ButtonIcon as={Plus} />
              </Button>
            </View>

            <Grid className="gap-3" _extra={{ className: "grid-cols-2" }}>
              {delivery.map((item, index) => (
                <GridItem _extra={{ className: "w-fit" }} key={index}>
                  <OngkirComponent city={item.nama_daerah} price={item.harga} />
                </GridItem>
              ))}
            </Grid>
            <Button
              onPress={() => router.push("/(screen)/order/seller/promo")}
              size="xl"
              variant="outline"
              className="bg-slate-300 border border-cyan-500 rounded-2xl mt-5 shadow-sm"
            >
              <ButtonText className=" flex flex-col items-center justify-center text-md italic	">
                *CANTUMKAN PERSYARATAN PROMO*
              </ButtonText>
            </Button>
          </View>

          <View>
            <Text className="text-black  mb-3 text-3xl font-bold">
              KELOLA TRANSFER
            </Text>

            <Card className="bg-slate-300 border w-full flex gap-3 border-cyan-500 rounded-2xl shadow-sm">
              <View className="flex flex-col">
                <Text className="text-black text-md italic">
                  *CANTUMKAN NO REKENING*
                </Text>
                <Text className="text-black text-md italic">
                  *NAMA PEMILIK REKENING*
                </Text>
              </View>

              <View className="flex flex-row w-full justify-between items-center">
                <Text className=" text-black text-md font-bold ">
                  *NAMA BANK*
                </Text>

                <Button
                  onPress={() => router.push("/order/seller/bank-account")}
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
        <View style={{ height: 100 }}>
          <Divider />
        </View>
      </ScrollView>
    </VStack>
  );
};

export default SellerOrder;

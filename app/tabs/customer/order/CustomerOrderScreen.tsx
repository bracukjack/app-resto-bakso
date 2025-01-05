import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import MyLoader from "@/components/shared/Loader";
import MenuListH from "@/components/shared/MenuListHorizontal";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Delivery } from "@/model/delivery";
import { Product } from "@/model/product";
import { Promo } from "@/model/promo";
import { Transfer } from "@/model/transfer";
import { User } from "@/model/user";
import ApiService from "@/service/apiService";
import { RootState } from "@/store";
import { formatRupiah } from "@/utils/formatCurrency";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChevronDownIcon, Frown, Search, Smile } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const CustomerOrderScreen = () => {
  const [menu, setMenu] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [transfer, setTransfer] = useState<Transfer[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [delivery, setDelivery] = useState<Delivery[]>([]);
  const [promo, setPromo] = useState<Promo[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [truePromo, setTruePromo] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [profile, setProfile] = useState<User | null>(null);
  const [hargaOngkir, setHargaOngkir] = useState(0);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchShopStatus = async () => {
    try {
      const response = await ApiService.get("/setting-buka-toko");
      const data = response.data?.data;

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

  const getOngkir = () => {
    const selectedDelivery = delivery.find(
      (d) => d.nama_daerah === profile?.kabupaten
    );

    setHargaOngkir(selectedDelivery?.harga || 0);
  };

  const fetchProfile = async () => {
    try {
      const response = await ApiService.get("/profile");
      const data = response.data.data;

      if (data) {
        setProfile(data);
      } else {
        console.log("Profile not found or invalid response");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
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

  const fetchPromo = async () => {
    try {
      const response = await ApiService.get("/promo");
      const data = response.data?.data;
      if (Array.isArray(data)) {
        setPromo(data);
      }
    } catch (error) {
      console.error("Error fetching promo:", error);
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
    fetchShopStatus();
    fetchTransfer();
    fetchMenu();
    fetchProfile();
    fetchDelivery();
    getOngkir();
    fetchPromo();
  }, []);

  const handleQtyChange = (id: number, qty: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: qty,
    }));
  };

  const totalAmount = menu.reduce((total, item) => {
    const qty = quantities[item.id] || 0;
    return total + (item.harga || 0) * qty;
  }, 0);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);

    if (value === "take-away") {
      setHargaOngkir(0);
    } else if (value === "delivery") {
      getOngkir();
    }
  };

  const handleSelectPaymentChange = (value: string) => {
    setSelectedPaymentOption(value);
  };

  const submitOrder = async () => {
    try {
      // Filter hanya item dengan qty > 0
      const items = menu
        .filter((item) => quantities[item.id] > 0)
        .map((item) => ({
          produk_id: item.id,
          jumlah: quantities[item.id],
        }));

      // Pastikan setidaknya ada satu item yang dipesan
      if (items.length === 0) {
        alert(
          "Tidak ada produk yang dipesan. Silakan pilih minimal satu produk."
        );
        return;
      }

      const deliveryId = delivery.find(
        (d) => d.nama_daerah === profile?.kabupaten
      );

      const body = {
        items: items,
        delivery_id: deliveryId?.id,
        metode_pembayaran: selectedPaymentOption,
        pembeli_id: profile?.id,
        delivery_type: selectedOption,
        promo: truePromo,
      };

      const response = await ApiService.post("/transaksi", body);

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Order Sukses", "Cek pada Akun di Transaksi Berlangsung", [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "CustomerOrder" }],
              });
            },
          },
        ]);

        // Reset state lokal
        setQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };
          menu.forEach((item) => {
            newQuantities[item.id] = 0; // Reset semua quantity ke 0
          });
          return newQuantities;
        });
        setIsPromoApplied(false);
        setPromoCode("");
        setTruePromo("");
        setSelectedOption(""); // Reset opsi pengiriman
        setSelectedPaymentOption(""); // Reset opsi pembayaran
      } else {
        alert("Gagal memproses order. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memproses pesanan Anda");
    }
  };

  const handleCheckPromo = () => {
    const matchedPromo = promo.find((item) => item.syarat_promo === promoCode);

    if (matchedPromo) {
      alert(`Promo ditemukan, anda mendapatkan Gratis Ongkir`);
      setTruePromo(matchedPromo.syarat_promo);
      setIsPromoApplied(true); // Promo diterapkan
    } else {
      setTruePromo("");
      setIsPromoApplied(false); // Promo tidak diterapkan
      alert(`Promo tidak ditemukan`);
    }
  };

  return loading ? (
    <MyLoader />
  ) : (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["blue"]}
          />
        }
      >
        {isShopOpen ? (
          <VStack space="md" className="p-5">
            {menu.map((item, index) => (
              <MenuListH
                id={item.id}
                key={index}
                image={item.gambar_url}
                title={item.nama_produk}
                price={item.harga}
                stok={item.stok}
                quantity={quantities[item.id] || 0}
                onQtyChange={handleQtyChange}
              />
            ))}

            <VStack space="md">
              <HStack className="gap-2" space="md">
                <Select className="w-1/2" onValueChange={handleSelectChange}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Delivery/TakeAway" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Delivery" value="delivery" />
                      <SelectItem label="Take Away" value="take-away" />
                    </SelectContent>
                  </SelectPortal>
                </Select>

                {selectedOption === "delivery" && (
                  <HStack className="w-1/2 gap-3">
                    <Input className="w-3/4">
                      <InputField
                        defaultValue={promoCode}
                        onChangeText={setPromoCode}
                        className="py-2"
                        type="text"
                        placeholder="Promo Code"
                      />
                    </Input>

                    <Button
                      onPress={handleCheckPromo}
                      className="gap-5 justify-start items-center"
                      variant="link"
                      action="negative"
                    >
                      <ButtonIcon as={Search} />
                    </Button>
                  </HStack>
                )}
              </HStack>

              <HStack className="gap-5" space="xl">
                <Select
                  className="w-1/2"
                  onValueChange={handleSelectPaymentChange}
                >
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder={"Cash/Transfer"} />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Cash" value="cash" />
                      <SelectItem label="Transfer" value="transfer" />
                    </SelectContent>
                  </SelectPortal>
                </Select>

                {selectedPaymentOption === "transfer" && (
                  <View className="w-1/2">
                    <Text className="font-bold text-sm">
                      {transfer[0].nama_bank} : {transfer[0].nomor_rekening}
                    </Text>
                    <Text className="text-sm">A/N {transfer[0].atas_nama}</Text>
                  </View>
                )}
              </HStack>
              {selectedPaymentOption === "transfer" && (
                <Text className="text-sm text-medium text-red-600">
                  Note : Konfirmasi bukti transfer di wa : 0812-XXXX-XXXX
                </Text>
              )}

              <View>
                <View className="flex flex-row justify-between mt-5">
                  <Text className="font-bold text-gray-600">TOTAL</Text>

                  <Text className="font-bold text-gray-600">
                    {formatRupiah(totalAmount)}
                  </Text>
                </View>

                {selectedOption === "delivery" && (
                  <View className="flex flex-row justify-between">
                    <Text className="font-semibold text-gray-600">
                      ONGKOS KIRIM
                    </Text>
                    <Text className="font-semibold text-gray-600">
                      {isPromoApplied
                        ? formatRupiah(0)
                        : formatRupiah(hargaOngkir)}
                    </Text>
                  </View>
                )}
                <View className="flex flex-row justify-between">
                  <Text className="font-bold text-green-600 text-lg">
                    TOTAL BAYAR
                  </Text>
                  <Text className="font-bold text-green-600 text-lg">
                    {formatRupiah(
                      totalAmount +
                        (selectedOption === "delivery" && !isPromoApplied
                          ? hargaOngkir
                          : 0) // Ongkir hanya ditambahkan jika promo tidak diterapkan
                    )}
                  </Text>
                </View>
              </View>

              <Button
                variant="solid"
                action="positive"
                className="mt-5"
                onPress={submitOrder}
              >
                <ButtonText>BUAT PESANAN</ButtonText>
              </Button>
            </VStack>
          </VStack>
        ) : (
          <Center className="h-[80vh] p-10">
            <VStack space="lg" className="items-center">
              <Frown size={100} color={"gray"} />

              <Text className="text-gray-600 text-3xl font-bold">
                KAMI SEDANG TUTUP
              </Text>

              <Text className="text-gray-600 text-center text-xl font-medium">
                Informasi buka dan tutup akan diupdate di social media kami{" "}
              </Text>
              <Smile
                size={40}
                className="text-white bg-yellow-500 p-1 rounded-full"
              />
            </VStack>
          </Center>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerOrderScreen;

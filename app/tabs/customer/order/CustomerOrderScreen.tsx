import menuData from "@/app/data/menuDummy";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import Header from "@/components/shared/Header";
import MenuListH from "@/components/shared/MenuListHorizontal";
import UploadMedia from "@/components/shared/UploadFile";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
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
import { Transfer } from "@/model/transfer";
import { User } from "@/model/user";
import ApiService from "@/service/apiService";
import { RootState } from "@/store";
import { formatRupiah } from "@/utils/formatCurrency";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChevronDownIcon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const CustomerOrderScreen = () => {
  const [menu, setMenu] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>("");
  const [transfer, setTransfer] = useState<Transfer[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [delivery, setDelivery] = useState<Delivery[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { token } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<User | null>(null);
  const [hargaOngkir, setHargaOngkir] = useState(0);
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
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await ApiService.get("/profile");
      const data = response.data.data;

      console.log("profile", data);

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

  const fetchDelivery = async () => {
    try {
      const response = await ApiService.get("/delivery");
      const data = response.data?.data;

      console.log("data", data);

      if (Array.isArray(data)) {
        setDelivery(data);
      }
    } catch (error) {
      console.error("Error fetching delivery:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTransfer();
      fetchMenu();
      fetchProfile();
      fetchDelivery();
      getOngkir();
    }
  }, [token]);

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
      };

      const response = await ApiService.post("/transaksi", body);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Order Sukses",
          "Cek pada Account di Transaction On Going",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("OnGoingList"), // Ganti dengan nama screen tujuan
            },
          ]
        );

        setQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };
          menu.forEach((item) => {
            newQuantities[item.id] = 0; // Reset all quantities to 0
          });
          return newQuantities;
        });
        setSelectedOption(""); // Reset selected delivery option
        setSelectedPaymentOption(""); // Reset selected payment option
      } else {
        alert("Failed to process order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while processing your order");
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Screen baru difokuskan");

      return () => {
        // Cleanup if necessary
      };
    }, [])
  );

  return (
    <ScrollView>
      <VStack space="md" className="p-5">
        {menu.map((item, index) => (
          <MenuListH
            id={item.id}
            key={index}
            image={item.gambar_url}
            title={item.nama_produk}
            price={item.harga}
            stok={item.stok}
            onQtyChange={handleQtyChange}
          />
        ))}

        <VStack space="md">
          <Grid className="gap-5" _extra={{ className: "grid-cols-2" }}>
            <GridItem _extra={{ className: "col-span-1" }}>
              <Select onValueChange={handleSelectChange}>
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
            </GridItem>

            {/* {selectedOption === "delivery" && (
              <Input>
                <InputField
                  value={promo}
                  onChangeText={setPromo}
                  className="py-2"
                  type="text"
                  placeholder="Promo Code"
                />
              </Input>
            )} */}

            {/* <GridItem _extra={{ className: "col-span-1" }}>
              {selectedOption === "delivery" && (
                <UploadMedia
                  mediaText="Upload Bukti Promo Untuk Mendapatkan CASHBACK FREE ONGKIR "
                  label="Add Bukti Promo"
                  
                />
              )}
            </GridItem> */}
          </Grid>

          <Grid className="gap-5" _extra={{ className: "grid-cols-2" }}>
            <GridItem _extra={{ className: "col-span-1" }}>
              <Select onValueChange={handleSelectPaymentChange}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Cash/Transfer" />
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
            </GridItem>

            <GridItem _extra={{ className: "col-span-1" }}>
              {selectedPaymentOption === "transfer" && (
                <View>
                  <Text className="font-bold text-sm">
                    {transfer[0].nama_bank} : {transfer[0].nomor_rekening}
                  </Text>
                  <Text className="text-sm">A/N {transfer[0].atas_nama}</Text>
                </View>
              )}
            </GridItem>
            {/* <GridItem _extra={{ className: "col-span-1" }}>
              {selectedPaymentOption === "transfer" && (
                <UploadMedia
                  mediaText="Upload Bukti Transfer"
                  label="Add Bukti Transfer"
                />
              )}
            </GridItem> */}
          </Grid>
          {selectedPaymentOption === "transfer" && (
            <Text className="text-sm text-medium text-red-600">
              Note : Konfirmasi bukti transfer di wa : 0812-XXXX-XXXX
            </Text>
          )}

          <View>
            <View className="flex flex-row justify-between mt-5">
              <Text className="font-bold text-gray-600">SUB TOTAL</Text>

              <Text className="font-bold text-gray-600">
                {formatRupiah(totalAmount)}
              </Text>
            </View>

            {selectedOption === "delivery" && (
              <View className="flex flex-row justify-between">
                <Text className="font-semibold text-gray-600">ONGKIR</Text>

                <Text className="font-semibold text-gray-600">
                  {formatRupiah(hargaOngkir)}
                </Text>
              </View>
            )}

            <View className="flex flex-row justify-between">
              <Text className="font-bold text-green-600 text-lg">
                GRAND TOTAL
              </Text>
              <Text className="font-bold text-green-600 text-lg">
                {formatRupiah(
                  totalAmount +
                    (selectedOption === "delivery" ? hargaOngkir : 0)
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
            <ButtonText>Process Order</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CustomerOrderScreen;

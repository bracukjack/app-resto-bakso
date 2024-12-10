import menuData from "@/app/data/menuDummy";
import Header from "@/components/shared/Header";
import MenuListH from "@/components/shared/MenuListHorizontal";
import UploadMedia from "@/components/shared/UploadFile";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
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
import { Product } from "@/model/product";
import { User } from "@/model/user";
import ApiService from "@/service/apiService";
import { RootState } from "@/store";
import { formatRupiah } from "@/utils/formatCurrency";
import { ChevronDownIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const CustomerOrderScreen = () => {
  const [menu, setMenu] = useState<Product[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { token } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<User | null>(null);

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

  const fetchProfile = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

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

  useEffect(() => {
    if (token) {
      fetchMenu();
      fetchProfile();
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
  };

  const handleSelectPaymentChange = (value: string) => {
    setSelectedPaymentOption(value);
  };

  const submitOrder = async () => {
    try {
      const items = menu.map((item) => ({
        produk_id: item.id,
        jumlah: quantities[item.id] || 0,
      }));

      const body = {
        items: items,
        delivery_id: selectedOption === "delivery" ? "take_away" : "",
        metode_pembayaran: selectedPaymentOption,
        pembeli_id: profile?.id,
        delivery_type: selectedOption,
      };

      const response = await ApiService.post("/transaksi", body);

      if (response.status === 200 || response.status === 201) {
        alert(
          "Order processed successfully Cek Halaman Account dan Transaction On Going"
        );
      } else {
        alert("Failed to process order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while processing your order");
    }
  };

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
            {/* <GridItem _extra={{ className: "col-span-1" }}>
              {selectedPaymentOption === "transfer" && (
                <UploadMedia
                  mediaText="Upload Bukti Transfer"
                  label="Add Bukti Transfer"
                />
              )}
            </GridItem> */}
          </Grid>
          <View className="flex flex-row justify-between mt-5">
            <Text className="font-bold text-blue-600 text-xl">GRAND TOTAL</Text>

            <Text className="font-bold text-blue-600 text-xl">
              {formatRupiah(totalAmount)}
            </Text>
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

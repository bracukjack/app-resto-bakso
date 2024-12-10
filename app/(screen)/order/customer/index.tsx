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
import { User } from "@/model/user";
import { formatRupiah } from "@/utils/formatCurrency";
import { ChevronDownIcon } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerOrder = () => {
  const menu = menuData;

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: qty,
    }));
  };

  const totalAmount = menu.reduce((total, item) => {
    const qty = quantities[item.id] || 0;
    return total + (item.price || 0) * qty;
  }, 0);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleSelectPaymentChange = (value: string) => {
    setSelectedPaymentOption(value);
  };

  return (
    <ScrollView>
      <VStack space="md" className="p-5">
        {menu.map((item, index) => (
          <MenuListH
            id={item.id}
            key={index}
            image={item.image}
            title={item.title}
            price={item.price}
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
            <GridItem _extra={{ className: "col-span-1" }}>
              {selectedOption === "delivery" && (
                <UploadMedia
                  mediaText="Upload Bukti Promo Untuk Mendapatkan CASHBACK FREE ONGKIR "
                  label="Add Bukti Promo"
                />
              )}
            </GridItem>
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
                <UploadMedia
                  mediaText="Upload Bukti Transfer"
                  label="Add Bukti Transfer"
                />
              )}
            </GridItem>
          </Grid>
          <View className="flex flex-row justify-between mt-5">
            <Text className="font-bold text-blue-600 text-xl">GRAND TOTAL</Text>

            <Text className="font-bold text-blue-600 text-xl">
              {formatRupiah(totalAmount)}
            </Text>
          </View>

          <Button variant="solid" action="positive" className="mt-5">
            <ButtonText>Process Order</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CustomerOrder;

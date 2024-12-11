import transactionRecap from "@/app/data/recapitulationDummy";
import Header from "@/components/shared/Header";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { formatDate } from "@/utils/dateFormat";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Alert, Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Table,
  TableBody,
  TableData,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/utils/formatCurrency";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Printer } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { ProductRecapitulation, Recapitulation } from "@/model/recapitulation";
import { useEffect, useState } from "react";
import ApiService from "@/service/apiService";

type RecapitulationDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "RecapitulationDetail"
>;

const RecapitulationDetailScreen = ({ route }: RecapitulationDetailProps) => {
  const { recapitulationDate } = route.params;
  const [productRecapitulation, setProductRecapitulation] =
    useState<ProductRecapitulation | null>(null);

  console.log("RECAP ", recapitulationDate);

  const tableHeaders = ["Product", "Qty", "Price"];

  const handlePrint = async () => {
    const fileUrl = `https://resto-bakso.redseal.cloud/api/v1/laporan-produk?date=${recapitulationDate}&download=1`;
    const supported = await Linking.canOpenURL(fileUrl);
    if (supported) {
      Linking.openURL(fileUrl);
    } else {
      Alert.alert("Cannot Open This URL");
    }
  };

  const fetchRecapitulation = async (date: string) => {
    try {
      const response = await ApiService.get(`/laporan-produk?date=${date}`);
      const data = response.data?.data;

      console.log("DATA ", data);

      setProductRecapitulation(data);
    } catch (error) {
      console.error("Error fetching recapitulation:", error);
    }
  };

  useEffect(() => {
    if (recapitulationDate) {
      fetchRecapitulation(recapitulationDate);
    }
  }, [recapitulationDate]);

  return (
    <VStack className="p-5">
      <View className="flex flex-row gap-1 justify-between items-center mb-5">
        <Text className="text-blue-500 font-bold text-2xl">
          {recapitulationDate}
        </Text>
        <Text className="text-black font-bold text-lg">
          Menu Terjual : {productRecapitulation?.total.total_produk}
        </Text>
      </View>

      <View className="flex flex-col justify-between items-center">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead className="p-2" key={index}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {productRecapitulation?.produk.map((item, index) => (
              <TableRow key={index}>
                <TableData className="p-2">{item.nama_produk}</TableData>
                <TableData className="p-2">{item.total_produk}</TableData>
                <TableData className="p-2">
                  {formatRupiah(item.harga)}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </View>

      <View className="flex flex-col gap-1 mt-5">
        <View className="flex flex-row gap-3 items-center justify-end">
          <Text className="text-xl font-bold">TOTAL:</Text>

          <Text className="text-xl font-bold text-black">
            {formatRupiah(productRecapitulation?.total.total_pendapatan || 0)}
          </Text>
        </View>
      </View>

      <Button
        size="lg"
        className="mt-5 flex-row items-center bg-blue-500 rounded-md"
        onPress={handlePrint}
      >
        <Printer size={20} color="#fff" />
        <Text className="text-white ml-2">PRINT</Text>
      </Button>
    </VStack>
  );
};

export default RecapitulationDetailScreen;

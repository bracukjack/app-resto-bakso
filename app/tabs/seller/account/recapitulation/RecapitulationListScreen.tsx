import transactionRecap from "@/app/data/recapitulationDummy";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import Header from "@/components/shared/Header";
import { Pressable } from "@/components/ui/pressable";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Recapitulation } from "@/model/recapitulation";
import ApiService from "@/service/apiService";
import { formatDate } from "@/utils/dateFormat";
import { formatRupiah } from "@/utils/formatCurrency";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecapitulationListScreen = () => {
  const tableHeaders = ["Date", "Transaction", "Total"];
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [recapitulation, setRecapitulation] = useState<Recapitulation>();

  const fetchRecapitulation = async () => {
    try {
      const response = await ApiService.get("/laporan");
      const data = response.data?.data;

      console.log("DATA ", data);

      if (data) {
        setRecapitulation(data);
      }
    } catch (error) {
      console.error("Failed to fetch Recapitulation:", error);
    }
  };

  useEffect(() => {
    fetchRecapitulation();
  }, []);

  return (
    <VStack className="p-5">
      <ScrollView>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead className="text-sm p-2" key={index}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {recapitulation?.transaksi.map((item, index) => (
              <TableRow key={index}>
                <TableData className=" text-sm font-bold text-blue-500 p-2">
                  <Pressable
                    onPress={() =>
                      navigation.navigate("RecapitulationDetail", {
                        recapitulationDate: item.tanggal_transaksi,
                      })
                    }
                  >
                    <Text className="font-bold text-blue-500">
                      {item.tanggal_transaksi}
                    </Text>
                  </Pressable>
                </TableData>
                <TableData className="text-sm p-2 ">
                  {item.total_pesanan}
                </TableData>

                <TableData className="text-sm p-2">
                  {formatRupiah(item.total_pendapatan)}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollView>
    </VStack>
  );
};

export default RecapitulationListScreen;

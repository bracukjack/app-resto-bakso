import transactionRecap from "@/app/data/recapitulationDummy";
import Header from "@/components/shared/Header";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VStack } from "@/components/ui/vstack";
import { Recapitulation } from "@/model/recapitulation";
import ApiService from "@/service/apiService";
import { formatDate } from "@/utils/dateFormat";
import { formatRupiah } from "@/utils/formatCurrency";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecapitulationReport = () => {
  const tableHeaders = ["Date", "Transaction", "Total"];
  const data = transactionRecap;

  const [recapitulation, setRecapitulation] = useState<Recapitulation[]>([]);

  const fetchRecapitulation = async () => {
    try {
      const response = await ApiService.get("/laporan");
      const data = response.data?.data;

      if (Array.isArray(data)) {
        setRecapitulation(data);
      }
    } catch (error) {
      console.error("Failed to fetch Recapitulation:", error);
    }
  };

  useEffect(() => {
    fetchRecapitulation();
  }, []);

  const router = useRouter();
  return (
    <SafeAreaView>
      <VStack className="p-5">
        <Header
          onBack={() => router.push("/(screen)/account")}
          title="Laporan Rekapitulasi"
        />

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
              {recapitulation.map((item, index) => (
                <TableRow key={index}>
                  <TableData
                    onPress={() =>
                      router.push(
                        `/recapitulation-report/detail/${item.tanggal_transaksi}`
                      )
                    }
                    className=" text-sm font-bold text-blue-500 p-2"
                  >
                    {item.tanggal_transaksi}
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
    </SafeAreaView>
  );
};

export default RecapitulationReport;

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
import { formatDate } from "@/utils/dateFormat";
import { formatRupiah } from "@/utils/formatCurrency";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RecapitulationReport = () => {
  const tableHeaders = ["Date", "Transaction", "Total"];
  const data = transactionRecap;

  const router = useRouter();
  return (
    <SafeAreaView>
      <VStack className="p-5">
        <Header
          onBack={() => router.push("/(screen)/account")}
          title="Laporan Rekapitulasi"
        />

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
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableData
                  onPress={() =>
                    router.push(`/recapitulation-report/detail/${item.id}`)
                  }
                  className=" text-sm font-bold text-blue-500 p-2"
                >
                  {formatDate(item.date)}
                </TableData>
                <TableData className="text-sm p-2 ">
                  {item.transaction_count}
                </TableData>

                <TableData className="text-sm p-2">
                  {formatRupiah(item.total)}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </VStack>
    </SafeAreaView>
  );
};

export default RecapitulationReport;

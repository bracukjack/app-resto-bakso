import transactionRecap from "@/app/data/recapitulationDummy";
import Header from "@/components/shared/Header";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { formatDate } from "@/utils/dateFormat";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View } from "react-native";
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

const RecapitulationReportDetail = () => {
  const tableHeaders = ["Product", "Qty", "Price"];
  const router = useRouter();
  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const { id } = route.params;
  const recap = transactionRecap.find((item) => item.id === id);

  return (
    <SafeAreaView>
      <VStack className="p-5">
        <Header
          onBack={() => router.push("/(screen)/transaction-report")}
          title="Recapitulation Report Detail"
        />
        <View className="flex flex-row gap-1 justify-between items-center mb-5">
          <Text className="text-blue-500 font-bold text-2xl">
            {formatDate(recap?.date || 0)}
          </Text>
          <Text className="text-black font-bold text-lg">
            Jumlah Transaksi: {recap?.transaction_count}
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
              {recap?.transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableData className="p-2">{transaction.title}</TableData>
                  <TableData className="p-2">{transaction.qty}</TableData>
                  <TableData className="p-2">
                    {formatRupiah(transaction.price)}
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
              {formatRupiah(recap?.total || 0)}
            </Text>
          </View>

          <View className="flex flex-row gap-3 items-center justify-end">
            <Text className="text-xl font-bold text-green-600">TRANSFER:</Text>

            <Text className="text-xl font-bold text-green-600">
              {formatRupiah(recap?.cash_method || 0)}
            </Text>
          </View>

          <View className="flex flex-row gap-3 items-center justify-end">
            <Text className="text-xl font-bold text-blue-600">CASH:</Text>
            <Text className="text-xl font-bold text-blue-600">
              {formatRupiah(recap?.transfer_method || 0)}
            </Text>
          </View>
        </View>

        <Button variant="solid" action="positive" className="rounded-full mt-5">
          <ButtonText>Print</ButtonText>
          <ButtonIcon as={Printer} />
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default RecapitulationReportDetail;

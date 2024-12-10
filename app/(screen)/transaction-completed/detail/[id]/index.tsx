import transactionData from "@/app/data/transactionDummy";
import Header from "@/components/shared/Header";
import { Alert, AlertText } from "@/components/ui/alert";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import {
  Table,
  TableBody,
  TableData,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Transaction } from "@/model/transaction";
import ApiService from "@/service/apiService";
import { formatRupiah } from "@/utils/formatCurrency";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Printer } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionReportDetail = () => {
  const tableHeaders = ["Product", "Qty", "Price"];
  const router = useRouter();

  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const { id } = route.params;

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = async () => {
    const fileUrl = `https://resto-bakso.redseal.cloud/api/v1/invoice/${transaction?.transactionNumber}`;
    const supported = await Linking.canOpenURL(fileUrl);
    if (supported) {
      Linking.openURL(fileUrl);
    } else {
      <Alert className="alert">
        <AlertText>Cannot open this URL.</AlertText>
      </Alert>;
    }
  };

  const fetchTransactionById = async (id: string) => {
    try {
      const response = await ApiService.get(`/transaksi/${id}`);
      const data = response.data?.data;

      if (data) {
        setTransaction(data);
      }
    } catch (error) {
      console.error("Failed to fetch transaction by ID:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransactionById(id);
    }
  }, [id]);

  return (
    <SafeAreaView>
      <VStack className="p-5">
        <Header
          onBack={() => router.push("/(screen)/transaction-completed")}
          title="Transaction Completed Detail"
        />
        <View className="flex flex-col gap-1 justify-start items-start mb-5">
          <Text className="text-blue-500 font-bold text-lg">
            {transaction?.transactionNumber} - {transaction?.transactionDate}
          </Text>
          <Text className="text-black font-bold text-3xl">
            {transaction?.customerName}
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
              {transaction?.products.map((product, index) => (
                <TableRow key={index}>
                  <TableData className="p-2">{product.name}</TableData>
                  <TableData className="p-2">{product.qty}</TableData>
                  <TableData className="p-2">
                    {formatRupiah(product.price)}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableHead className="p-2 text-red-500">Total</TableHead>
                <TableHead className="p-2 text-red-500">
                  {transaction?.totalAmount}
                </TableHead>
                <TableHead className="p-2 text-red-500">
                  {formatRupiah(transaction?.totalAmount || 0)}
                </TableHead>
              </TableRow>
            </TableFooter>
          </Table>
        </View>
        <Text className="text-lg font-bold mb-5 mt-5">
          Adress : {transaction?.customerAddress}
        </Text>

        <HStack className="flex flex-row gap-5 ">
          {transaction?.deliveryMethod === "delivery" && (
            <Button disabled variant="solid" className="bg-cyan-600">
              <ButtonText> {transaction?.deliveryMethod}</ButtonText>
            </Button>
          )}

          {transaction?.promo && transaction?.deliveryMethod === "delivery" && (
            <Button disabled variant="solid" action="positive">
              <ButtonText> Free Delivery </ButtonText>
            </Button>
          )}
        </HStack>

        <View className="flex flex-row gap-3 items-center">
          <Text className="text-lg mb-5 mt-5">Metode Pembayaran :</Text>
          <Text className="text-xl font-bold mb-5 mt-5 text-cyan-600">
            {transaction?.paymentMethod}
          </Text>
        </View>

        <View className="flex flex-row gap-3 items-center justify-end">
          <Text className="text-xl font-bold mb-5 mt-5">TOTAL:</Text>

          <Text className="text-xl font-bold mb-5 mt-5 text-green-600">
            {formatRupiah(transaction?.totalAmount || 0)}
          </Text>
        </View>

        <Button disabled variant="solid" className="bg-blue-500">
          <ButtonText> COMPLETED </ButtonText>
        </Button>

        <Button
          size="lg"
          className="mt-5 flex-row items-center bg-blue-500 rounded-md"
          onPress={handlePrint}
        >
          <Printer size={20} color="#fff" />
          <Text className="text-white ml-2">PRINT</Text>
        </Button>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </VStack>
    </SafeAreaView>
  );
};

export default TransactionReportDetail;

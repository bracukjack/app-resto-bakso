import transactionData from "@/app/data/transactionDummy";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import Header from "@/components/shared/Header";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
import { StatusOrder } from "@/constants/statusEnums";
import { Transaction } from "@/model/transaction";
import ApiService from "@/service/apiService";
import { RootState } from "@/store";
import { formatRupiah } from "@/utils/formatCurrency";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import { Check, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const CompleteListScreen = () => {
  const tableHeaders = ["Buyer", "Order", "Total", "status"];
  const { email } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await ApiService.get("/transaksi");
      const data = response.data?.data;
      const filteredData = data.filter(
        (transaction: Transaction) =>
          (transaction.status === StatusOrder.Completed ||
            transaction.status === StatusOrder.Complaint) &&
          transaction.customerEmail === email
      );
      if (Array.isArray(filteredData)) {
        setTransactions(filteredData);
      }
      console.log("DATA ", filteredData);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
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
              {transactions.map((item, index) => (
                <TableRow key={index}>
                  <TableData className=" text-sm font-bold text-blue-500 p-2">
                    <Pressable
                      onPress={() =>
                        navigation.navigate("CompletedDetail", {
                          transactionId: item.id,
                        })
                      }
                    >
                      <Text className="font-bold text-blue-500">
                        {item.customerName}
                      </Text>
                    </Pressable>
                  </TableData>
                  <TableData className="text-sm p-2 ">
                    {item.products
                      .map((product) => {
                        const nameParts = product.name.split(" ");
                        const initials = nameParts
                          .map((part) => part.charAt(0).toUpperCase())
                          .join("");
                        return initials;
                      })
                      .join(", ")}{" "}
                  </TableData>

                  <TableData className="text-sm p-2">
                    {formatRupiah(item.totalAmount)}
                  </TableData>

                  <TableData className="p-2">
                    {item.status === StatusOrder.Completed ? (
                      <Button
                        className="bg-blue-500 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText>{item.status}</ButtonText>
                      </Button>
                    ) : (
                      <Button
                        className="bg-red-500 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText>{item.status}</ButtonText>
                      </Button>
                    )}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollView>
      </VStack>
    </>
  );
};

export default CompleteListScreen;

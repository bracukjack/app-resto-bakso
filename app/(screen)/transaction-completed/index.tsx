import transactionData from "@/app/data/transactionDummy";
import Header from "@/components/shared/Header";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VStack } from "@/components/ui/vstack";
import { formatRupiah } from "@/utils/formatCurrency";
import { useRouter } from "expo-router";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionOngoing = () => {
  const tableHeaders = ["Buyer", "Order", "Total", "status"];
  const router = useRouter();

  const customerName = "Sophia Williams";
  const data = transactionData.filter(
    (item) => item.customerName === customerName && item.status === "completed"
  );

  return (
    <SafeAreaView>
      <VStack className="p-5">
        <Header
          onBack={() => router.push("/(screen)/account")}
          title="Transaction Completed"
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
                    router.push(`/transaction-ongoing/detail/${item.id}`)
                  }
                  className=" text-sm font-bold text-blue-500 p-2"
                >
                  {item.customerName}
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
                  <Button
                    className="bg-blue-500 text-white px-2 rounded"
                    size="xs"
                    variant="solid"
                  >
                    <ButtonText>{item.status}</ButtonText>
                  </Button>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </VStack>
    </SafeAreaView>
  );
};

export default TransactionOngoing;

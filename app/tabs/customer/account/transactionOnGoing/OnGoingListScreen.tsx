import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import MyLoader from "@/components/shared/Loader";
import { Button, ButtonText } from "@/components/ui/button";
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
import { formatRupiah } from "@/utils/formatCurrency";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import React from "react";

const OnGoingListScreen = () => {
  const tableHeaders = ["Nama", "Order", "Total", "Status"];
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchTransactions = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");

      const response = await ApiService.get("/transaksi");
      const data = response.data?.data;

      // Filter data berdasarkan email dari AsyncStorage
      const filteredData = data.filter(
        (transaction: Transaction) =>
          transaction.status !== StatusOrder.Completed &&
          transaction.status !== StatusOrder.Complaint &&
          transaction.customerEmail === storedEmail
      );

      if (Array.isArray(filteredData)) {
        setTransactions(filteredData);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return loading ? (
    <MyLoader />
  ) : (
    <VStack className="p-5">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["blue"]}
          />
        }
      >
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
            {transactions ? (
              transactions.map((item, index) => (
                <TableRow key={index}>
                  <TableData className=" text-sm font-bold text-blue-500 p-2">
                    <Pressable
                      onPress={() =>
                        navigation.navigate("OnGoingDetail", {
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
                    {formatRupiah(item.totalAmountAfterPromo)}
                  </TableData>

                  <TableData className="p-2">
                    {item.status === StatusOrder.Accepted ? (
                      <Button
                        className="bg-green-500 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText className="text-[8px]">Diterima</ButtonText>
                      </Button>
                    ) : item.status === StatusOrder.Rejected ? (
                      <Button
                        className="bg-gray-400 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText className="text-[8px]">Ditolak</ButtonText>
                      </Button>
                    ) : item.status === StatusOrder.Completed ? (
                      <Button
                        className="bg-blue-500 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText className="text-[8px]">Berhasil</ButtonText>
                      </Button>
                    ) : item.status === StatusOrder.Complaint ? (
                      <Button
                        className="bg-red-500 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText className="text-[8px]">Komplin</ButtonText>
                      </Button>
                    ) : item.paymentMethod === "transfer" ? (
                      <>
                        {item.status === StatusOrder.Pending &&
                        item.buktiPembayaranUrl ? (
                          <Button
                            className="bg-blue-500 text-white px-2 rounded"
                            size="xs"
                            variant="solid"
                          >
                            <ButtonText className="text-[8px]">
                              Dibayar
                            </ButtonText>
                          </Button>
                        ) : (
                          <Button
                            className="bg-orange-500 text-white px-2 rounded"
                            size="xs"
                            variant="solid"
                          >
                            <ButtonText className="text-[8px]">
                              Belum Bayar
                            </ButtonText>
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        className="bg-yellow-500 text-white px-2 rounded"
                        size="xs"
                        variant="solid"
                      >
                        <ButtonText className="text-[8px]">Menunggu</ButtonText>
                      </Button>
                    )}
                  </TableData>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableData className="text-sm p-2">No transaction</TableData>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollView>
    </VStack>
  );
};

export default OnGoingListScreen;

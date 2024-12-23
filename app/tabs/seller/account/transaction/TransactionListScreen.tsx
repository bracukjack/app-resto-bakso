import React from "react";
import transactionData from "@/app/data/transactionDummy";
import AppModal from "@/components/shared/AppModal";
import Header from "@/components/shared/Header";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
import { formatRupiah } from "@/utils/formatCurrency";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import ApiService from "@/service/apiService";
import { Transaction } from "@/model/transaction";
import { ScrollView } from "react-native";
import { StatusOrder } from "@/constants/statusEnums";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { Pressable } from "@/components/ui/pressable";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { set } from "mobx";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Search } from "lucide-react-native";

const TransactionListScreen = () => {
  const tableHeaders = ["Buyer", "Order", "Total", "Status"];
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"accepted" | "rejected" | null>(
    null
  );
  const [transactionId, setTransactionId] = useState<number | null>(null);

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  const fetchTransactions = async () => {
    try {
      const response = await ApiService.get("/transaksi");
      const data = response.data?.data;

      if (Array.isArray(data)) {
        const filterData = data.filter(
          (item) => item.transactionDate === today
        );
        setTransactions(filterData);
        setFilteredTransactions(data); // Initialize filtered transactions
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSearch = () => {
    const filtered = transactions.filter((item) =>
      item.customerName.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const openModalConfirm = (id: number) => {
    setTransactionId(id);
    setShowModalConfirm(true);
  };

  const closeModalConfirm = () => {
    setShowModalConfirm(false);
  };
  const openModal = (type: "accepted" | "rejected") => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  // search function with /transaksi?search= api

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const handleAccept = async (id: number) => {
    try {
      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${id}&status=${StatusOrder.Accepted}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModalConfirm();
        fetchTransactions();
      } else {
        // Handle the case when token is undefined or null
        // You can show an error message or take any other appropriate action
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    }
  };

  const handleReject = async (id: number) => {
    try {
      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${id}&status=${StatusOrder.Rejected}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModalConfirm();
        fetchTransactions();
      } else {
        // Handle the case when token is undefined or null
        // You can show an error message or take any other appropriate action
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <>
      <VStack className="px-5 pt-5 pb-20">
        <HStack className="mb-5 w-full gap-3">
          <Input className=" border w-1/2 focus:border-cyan-600">
            <InputField
              defaultValue={searchKey}
              onChangeText={setSearchKey}
              className="py-2"
              type="text"
              placeholder="Search Customer"
            />
          </Input>

          <Button
            onPress={handleSearch}
            className="gap-5 justify-start items-center"
            variant="link"
          >
            <ButtonIcon as={Search} />
          </Button>
        </HStack>
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
            <ScrollView>
              {transactions
                .filter((item) => item.transactionDate === today)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableData className=" text-sm font-bold text-blue-500 p-2">
                      <Pressable
                        onPress={() =>
                          navigation.navigate("TransactionDetail", {
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
                          <ButtonText>{item.status}</ButtonText>
                        </Button>
                      ) : item.status === StatusOrder.Rejected ? (
                        <Button
                          className="bg-gray-400 text-white px-2 rounded"
                          size="xs"
                          variant="solid"
                        >
                          <ButtonText>{item.status}</ButtonText>
                        </Button>
                      ) : item.status === StatusOrder.Completed ? (
                        <Button
                          className="bg-blue-500 text-white px-2 rounded"
                          size="xs"
                          variant="solid"
                        >
                          <ButtonText>{item.status}</ButtonText>
                        </Button>
                      ) : item.status === StatusOrder.Complaint ? (
                        <Button
                          className="bg-red-500 text-white px-2 rounded"
                          size="xs"
                          variant="solid"
                        >
                          <ButtonText>{item.status}</ButtonText>
                        </Button>
                      ) : (
                        <Button
                          className="bg-yellow-500 text-white px-2 rounded"
                          size="xs"
                          variant="solid"
                        >
                          <ButtonText>{item.status}</ButtonText>
                        </Button>
                      )}
                    </TableData>
                  </TableRow>
                ))}

              {transactions.length === 0 && (
                <TableRow>
                  <TableData className="text-sm p-2">
                    No transaction found
                  </TableData>
                </TableRow>
              )}
            </ScrollView>
          </TableBody>
        </Table>
      </VStack>

      {showModal && (
        <AppModal
          resource={transactionId}
          showModal={showModal}
          setShowModal={closeModal}
          heading={modalType === "accepted" ? "TERIMA PESANAN" : "Rejected"}
          bodyText={
            modalType === "accepted"
              ? "Pastikan Ketersediaan Produk & Informasi Pesanan, Klik Tombol “Lanjutkan” Untuk Menerima Pesanan"
              : "Hubungi Pembeli Mengenai Alasan Tolak Pesanan, Klik Tombol “Lanjutkan” Untuk Menolak Pesanan"
          }
          rejectText="Cancel"
          cancelColor="negative"
          confirmText={modalType === "accepted" ? "Lanjutkan" : "Lanjutkan"}
          onCancel={closeModal}
          onConfirm={
            modalType === "accepted"
              ? () => transactionId !== null && handleAccept(transactionId)
              : () => transactionId !== null && handleReject(transactionId)
          }
        />
      )}

      {showModalConfirm && (
        <AppModal
          resource={transactionId}
          showModal={showModalConfirm}
          setShowModal={closeModalConfirm}
          heading={"Confirm Order"}
          bodyText={"Confirm Order, Terima atau tolak pesanan ini?"}
          rejectText="rejected"
          confirmText={"accepted"}
          confirmColor="positive"
          cancelColor="negative"
          onCancel={() => openModal("rejected")}
          onConfirm={() => openModal("accepted")}
        />
      )}
    </>
  );
};

export default TransactionListScreen;

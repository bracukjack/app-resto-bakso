import transactionData from "@/app/data/transactionDummy";
import AppModal from "@/components/shared/AppModal";
import Header from "@/components/shared/Header";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
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
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import ApiService from "@/service/apiService";
import { Transaction } from "@/model/transaction";
import { ScrollView } from "react-native";
import { StatusOrder } from "@/constants/statusEnums";

const TransactionList = () => {
  const tableHeaders = ["Buyer", "Order", "Total", "Status"];
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"accepted" | "rejected" | null>(
    null
  );
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await ApiService.get("/transaksi");
      const data = response.data?.data;

      if (Array.isArray(data)) {
        setTransactions(data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const openModalConfirm = () => {
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

  return (
    <SafeAreaView>
      <VStack className="p-5">
        <Header
          onBack={() => router.push("/(screen)/account")}
          title="Transaction Report"
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
              {transactions.map((item, index) => (
                <TableRow key={index}>
                  <TableData
                    onPress={() =>
                      router.push(`/transaction-report/detail/${item.id}`)
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
                        onPress={() => openModalConfirm()}
                        size="xs"
                        variant="link"
                      >
                        <ButtonText className="font-bold text-blue-500 underline">
                          Confirm?
                        </ButtonText>
                      </Button>
                    )}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollView>
      </VStack>

      {showModal && (
        <AppModal
          showModal={showModal}
          setShowModal={closeModal}
          heading={modalType === "accepted" ? "TERIMA PESANAN" : "Rejected"}
          bodyText={
            modalType === "accepted"
              ? "Pastikan Ketersediaan Produk & Informasi Pesanan, Klik Tombol “Lanjutkan” Untuk Menerima Pesanan"
              : "Hubungi Pembeli Mengenai Alasan Tolak Pesanan, Klik Tombol “Lanjutkan” Untuk Menolak Pesanan"
          }
          rejectText="Cancel"
          confirmText={modalType === "accepted" ? "Lanjutkan" : "Lanjutkan"}
          onCancel={closeModal}
          onConfirm={closeModal}
        />
      )}

      {showModalConfirm && (
        <AppModal
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
    </SafeAreaView>
  );
};

export default TransactionList;

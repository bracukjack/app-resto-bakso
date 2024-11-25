import transactionData from "@/app/data/transactionDummy";
import AppModal from "@/components/shared/AppModal";
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

const TransactionReport = () => {
  const tableHeaders = ["Buyer", "Order", "Total", "action"];
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"accepted" | "rejected" | null>(
    null
  );

  const data = transactionData;

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
                  {formatRupiah(item.totalAmount)}
                </TableData>

                <TableData className="p-2">
                  {item.status === "accepted" ? (
                    <Button
                      className="bg-green-500 text-white px-2 rounded"
                      size="xs"
                      variant="solid"
                    >
                      <ButtonText>{item.status}</ButtonText>
                    </Button>
                  ) : item.status === "rejected" ? (
                    <Button
                      className="bg-gray-400 text-white px-2 rounded"
                      size="xs"
                      variant="solid"
                    >
                      <ButtonText>{item.status}</ButtonText>
                    </Button>
                  ) : item.status === "completed" ? (
                    <Button
                      className="bg-blue-500 text-white px-2 rounded"
                      size="xs"
                      variant="solid"
                    >
                      <ButtonText>{item.status}</ButtonText>
                    </Button>
                  ) : item.status === "complain" ? (
                    <Button
                      className="bg-red-500 text-white px-2 rounded"
                      size="xs"
                      variant="solid"
                    >
                      <ButtonText>{item.status}</ButtonText>
                    </Button>
                  ) : (
                    <View className="flex flex-row justify-center items-center gap-1">
                      <Button
                        onPress={() => openModal("accepted")}
                        size="xs"
                        variant="solid"
                        action="positive"
                        className="bg-blue-500 text-white px-2 rounded"
                      >
                        <ButtonIcon as={Check} />
                      </Button>
                      <Button
                        onPress={() => openModal("rejected")}
                        size="xs"
                        variant="solid"
                        action="negative"
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        <ButtonIcon as={X} />
                      </Button>
                    </View>
                  )}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          onCancel={closeModal}
          onConfirm={closeModal}
        />
      )}
    </SafeAreaView>
  );
};

export default TransactionReport;

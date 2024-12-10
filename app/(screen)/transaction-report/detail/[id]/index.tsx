import transactionData from "@/app/data/transactionDummy";
import AppModal from "@/components/shared/AppModal";
import Header from "@/components/shared/Header";
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
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionReportDetail = () => {
  const tableHeaders = ["Product", "Qty", "Price"];
  const router = useRouter();

  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const { id } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"accepted" | "rejected" | null>(
    null
  );
  const [transaction, setTransaction] = useState<Transaction | null>(null);

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
          onBack={() => router.push("/(screen)/transaction-report")}
          title="Transaction Report Detail"
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
                <TableHead className="p-2 text-red-500">{}</TableHead>
                <TableHead className="p-2 text-red-500">
                  {formatRupiah(transaction?.totalAmount || 0)}
                </TableHead>
              </TableRow>
            </TableFooter>
          </Table>
        </View>
        <Text className="text-lg font-bold mb-5 mt-5">
          Adress : {transaction?.customerName}
        </Text>

        <HStack className="flex flex-row gap-5 ">
          <Button disabled variant="solid" className="bg-cyan-600">
            <ButtonText> {transaction?.deliveryMethod}</ButtonText>
          </Button>

          {transaction?.promo && (
            <Button disabled variant="solid" action="positive">
              <ButtonText> {transaction?.promo}</ButtonText>
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

        {transaction?.status === "new" && (
          <Grid className="w-full gap-2" _extra={{ className: "grid-cols-2" }}>
            <GridItem _extra={{ className: "col-span-1" }}>
              <Button
                onPress={() => openModal("accepted")}
                variant="solid"
                action="positive"
              >
                <ButtonText> TERIMA </ButtonText>
              </Button>
            </GridItem>

            <GridItem _extra={{ className: "col-span-1" }}>
              <Button
                onPress={() => openModal("rejected")}
                variant="solid"
                action="negative"
              >
                <ButtonText> TOLAK </ButtonText>
              </Button>
            </GridItem>
          </Grid>
        )}

        {transaction?.status === "accepted" && (
          <Button disabled variant="solid" className="bg-green-500">
            <ButtonText> DITERIMA </ButtonText>
          </Button>
        )}

        {transaction?.status === "rejected" && (
          <Button disabled variant="solid" className="bg-gray-500">
            <ButtonText> DITOLAK </ButtonText>
          </Button>
        )}

        {transaction?.status === "completed" && (
          <Button disabled variant="solid" className="bg-blue-500">
            <ButtonText> COMPLETED </ButtonText>
          </Button>
        )}

        {transaction?.status === "complain" && (
          <Button disabled variant="solid" className="bg-red-500">
            <ButtonText> COMPLAIN </ButtonText>
          </Button>
        )}

        <Button variant="solid" action="positive" className="mt-5">
          <ButtonText> PRINT </ButtonText>
          <ButtonIcon as={Printer} />
        </Button>
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
    </SafeAreaView>
  );
};

export default TransactionReportDetail;

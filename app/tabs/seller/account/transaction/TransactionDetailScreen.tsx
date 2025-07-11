import React, { useCallback } from "react";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import AppModal from "@/components/shared/AppModal";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
import { StatusOrder } from "@/constants/statusEnums";
import { Transaction } from "@/model/transaction";
import ApiService from "@/service/apiService";
import { RootState } from "@/store";
import { formatRupiah } from "@/utils/formatCurrency";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Printer } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Linking, RefreshControl, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import MyLoader from "@/components/shared/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePreviewModal from "@/components/shared/ImagePreviewModal";

type TransactionDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "TransactionDetail"
>;

const TransactionDetailScreen = ({ route }: TransactionDetailProps) => {
  const tableHeaders = ["Produk", "Jumlah", "Harga"];
  const { transactionId } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    StatusOrder.Accepted | StatusOrder.Rejected | null
  >(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePrint = async () => {
    const fileUrl = `https://resto-bakso.redseal.cloud/api/v1/invoice/${transaction?.transactionNumber}`;
    const supported = await Linking.canOpenURL(fileUrl);
    if (supported) {
      Linking.openURL(fileUrl);
    } else {
      Alert.alert("Tidak Dapat Membuka URL Ini");
    }
  };

  const fetchTransactionById = async (id: number) => {
    try {
      const response = await ApiService.get(`/transaksi/${id}`);
      const data = response.data?.data;

      if (data) {
        setTransaction(data);
      }
    } catch (error) {
      console.error("Gagal mengambil transaksi berdasarkan ID:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId) {
      fetchTransactionById(transactionId);
    }
  }, [transactionId]);

  const openModal = (type: StatusOrder.Accepted | StatusOrder.Rejected) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleAccept = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${id}&status=${StatusOrder.Accepted}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModal();
        fetchTransactionById(transactionId);
      } else {
        Alert.alert("Error", "Token tidak ditemukan. Silakan Login kembali.");
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    }
  };

  const handleReject = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${id}&status=${StatusOrder.Rejected}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModal();
        fetchTransactionById(transactionId);
      } else {
        Alert.alert("Error", "Token tidak ditemukan. Silakan Login kembali.");
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    }
  };

  return loading ? (
    <MyLoader />
  ) : (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["blue"]}
          />
        }
      >
        <VStack className="p-5">
          <View className="flex flex-col gap-1 justify-start items-start mb-5">
            <Text className="text-blue-500 font-bold text-lg">
              {transaction?.transactionNumber} - {transaction?.transactionDate}
            </Text>
            <Text className="text-black font-bold text-3xl">
              {transaction?.customerName}
            </Text>
            <Text className="text-black font-bold text-lg">
              No Tlp: {transaction?.customerPhone}
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
          <Text className="text-lg font-bold mb-5 mt-5 capitalize">
            Alamat : {transaction?.customerAddress}
          </Text>

          <HStack className="flex flex-row gap-5 ">
            <Button disabled variant="solid" className="bg-cyan-600">
              <ButtonText className="capitalize">
                {transaction?.deliveryMethod}
              </ButtonText>
            </Button>

            {transaction?.promo && (
              <Button disabled variant="solid" action="positive">
                <ButtonText> Free Delivery </ButtonText>
              </Button>
            )}
          </HStack>

          <View className="flex flex-row gap-3 items-center">
            <Text className="text-lg mb-2 mt-2">Metode Pembayaran :</Text>
            <Text className="text-xl font-bold mb-2 mt-2 text-cyan-600 capitalize">
              {transaction?.paymentMethod}
            </Text>
            {transaction?.paymentMethod === "transfer" &&
              (transaction?.buktiPembayaranUrl ? (
                <Button size="xs" action="positive" disabled>
                  <ButtonText>Dibayar</ButtonText>
                </Button>
              ) : (
                <Button size="xs" action="negative" disabled>
                  <ButtonText>Belum Bayar</ButtonText>
                </Button>
              ))}
          </View>

          {transaction?.buktiPembayaranUrl && (
            <HStack space="xl">
              <ImagePreviewModal imageUrl={transaction?.buktiPembayaranUrl} />
            </HStack>
          )}

          <View className="flex flex-row gap-3 items-center justify-end">
            <Text className="text-xl font-bold mt-2">ONGKOS KIRIM :</Text>

            <Text className="text-xl font-bold mt-2 text-blue-600">
              {formatRupiah(
                (transaction?.totalAmountAfterPromo ?? 0) -
                  (transaction?.totalAmount ?? 0)
              )}
            </Text>
          </View>

          <View className="flex flex-row gap-3 items-center justify-end">
            <Text className="text-xl font-bold mb-5 mt-2">TOTAL BAYAR:</Text>

            <Text className="text-xl font-bold mb-5 mt-2 text-green-600">
              {formatRupiah(transaction?.totalAmountAfterPromo || 0)}
            </Text>
          </View>

          {transaction?.paymentMethod === "transfer" && (
            <VStack space="xl" className="mb-2">
              {transaction?.status === StatusOrder.Pending &&
                transaction.buktiPembayaranUrl === null && (
                  <Button disabled variant="solid" className="bg-orange-500">
                    <ButtonText> BELUM BAYAR </ButtonText>
                  </Button>
                )}

              {transaction?.status === StatusOrder.Pending &&
                transaction.buktiPembayaranUrl !== null && (
                  <Button disabled variant="solid" className="bg-yellow-500">
                    <ButtonText> MENUNGGU DITERIMA </ButtonText>
                  </Button>
                )}
            </VStack>
          )}

          {transaction?.status === StatusOrder.Pending && (
            <Grid className="w-full" _extra={{ className: "grid-cols-2" }}>
              {transaction.buktiPembayaranUrl && (
                <GridItem _extra={{ className: "col-span-1" }}>
                  <Button
                    onPress={() => openModal(StatusOrder.Accepted)}
                    variant="solid"
                    action="positive"
                    className="mr-1"
                  >
                    <ButtonText> TERIMA </ButtonText>
                  </Button>
                </GridItem>
              )}

              <GridItem _extra={{ className: "col-span-1" }}>
                <Button
                  className="ml-1"
                  onPress={() => openModal(StatusOrder.Rejected)}
                  variant="solid"
                  action="negative"
                >
                  <ButtonText> TOLAK </ButtonText>
                </Button>
              </GridItem>
            </Grid>
          )}

          {transaction?.status === StatusOrder.Accepted && (
            <Button disabled variant="solid" className="bg-green-500">
              <ButtonText> DITERIMA </ButtonText>
            </Button>
          )}

          {transaction?.status === StatusOrder.Rejected && (
            <Button disabled variant="solid" className="bg-gray-500">
              <ButtonText> DITOLAK </ButtonText>
            </Button>
          )}

          {transaction?.status === StatusOrder.Completed && (
            <Button disabled variant="solid" className="bg-blue-500">
              <ButtonText> BERHASIL </ButtonText>
            </Button>
          )}

          {transaction?.status === StatusOrder.Complaint && (
            <Button disabled variant="solid" className="bg-red-500">
              <ButtonText> KOMPLIN </ButtonText>
            </Button>
          )}

          <Button
            variant="solid"
            action="positive"
            className="mt-2"
            onPress={handlePrint}
          >
            <ButtonText> PRINT </ButtonText>
            <ButtonIcon as={Printer} />
          </Button>
        </VStack>
      </ScrollView>

      {showModal && (
        <AppModal
          showModal={showModal}
          setShowModal={closeModal}
          heading={
            modalType === StatusOrder.Accepted
              ? "TERIMA PESANAN"
              : "TOLAK PESANAN"
          }
          bodyText={
            modalType === StatusOrder.Accepted
              ? "Pastikan Ketersediaan Produk & Informasi Pesanan, Klik Tombol “Lanjutkan” Untuk Menerima Pesanan"
              : "Hubungi Pembeli Mengenai Alasan Tolak Pesanan, Klik Tombol “Lanjutkan” Untuk Menolak Pesanan"
          }
          rejectText="Kembali"
          cancelColor="negative"
          confirmText={"Lanjutkan"}
          onCancel={closeModal}
          onConfirm={
            modalType === StatusOrder.Accepted
              ? () => transactionId !== null && handleAccept(transactionId)
              : () => transactionId !== null && handleReject(transactionId)
          }
        />
      )}
    </>
  );
};

export default TransactionDetailScreen;

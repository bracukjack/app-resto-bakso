import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import AppModal from "@/components/shared/AppModal";
import MyLoader from "@/components/shared/Loader";
import { Button, ButtonText } from "@/components/ui/button";
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
import { formatRupiah } from "@/utils/formatCurrency";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Printer } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

type OnGoingDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "OnGoingDetail"
>;

const OnGoingDetailScreen = ({ route }: OnGoingDetailProps) => {
  const tableHeaders = ["Produk", "Jumlah", "Harga"];
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [modalType, setModalType] = useState<
    StatusOrder.Completed | StatusOrder.Complaint | null
  >(null);
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

  const openModalCancel = () => {
    setShowModalCancel(true);
  };

  const closeModalCancel = () => {
    setShowModalCancel(false);
  };

  const openModal = (type: StatusOrder.Completed | StatusOrder.Complaint) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleCompleted = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${transactionId}&status=${StatusOrder.Completed}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModal();
        fetchTransactionById(transactionId);
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    } finally {
      setLoading(false);
    }
  };

  const handleComplaint = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${transactionId}&status=${StatusOrder.Complaint}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModal();
        fetchTransactionById(transactionId);
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await ApiService.put(
          `/transaksi-update-status?transaksi_id=${id}&status=${StatusOrder.Rejected}`,
          {},
          token
        );
        // Handle success, close modal, update state, etc.
        closeModalCancel();
        fetchTransactionById(transactionId);
      }
    } catch (error) {
      // Handle error, show message to user, etc.
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <MyLoader />
  ) : (
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
                <TableHead className="p-2 text-red-500"></TableHead>
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
            <ButtonText> {transaction?.deliveryMethod}</ButtonText>
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
        </View>

        <View className="flex flex-row gap-3 items-center justify-end">
          <Text className="text-xl font-bold mt-2">ONGKOS KIRIM:</Text>

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

        {transaction?.status === StatusOrder.Pending && (
          <Button disabled variant="solid" className="bg-yellow-500">
            <ButtonText> MENUNGGU </ButtonText>
          </Button>
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

        {transaction?.status === StatusOrder.Pending && (
          <Button
            onPress={() => openModalCancel()}
            variant="solid"
            className="mr-1 mt-5 bg-red-500"
          >
            <ButtonText> BATALKAN PESANAN </ButtonText>
          </Button>
        )}

        {transaction?.status === StatusOrder.Accepted && (
          <Grid
            className="w-full gap-2 mt-3"
            _extra={{ className: "grid-cols-2" }}
          >
            <GridItem _extra={{ className: "col-span-1" }}>
              <Button
                onPress={() => openModal(StatusOrder.Completed)}
                variant="solid"
                className="bg-blue-500"
              >
                <ButtonText> SELESAI </ButtonText>
              </Button>
            </GridItem>

            <GridItem _extra={{ className: "col-span-1" }}>
              <Button
                onPress={() => openModal(StatusOrder.Complaint)}
                variant="solid"
                className="bg-red-500"
              >
                <ButtonText> KOMPLIN </ButtonText>
              </Button>
            </GridItem>
          </Grid>
        )}

        <Button
          size="lg"
          className="mt-5 flex-row items-center bg-blue-500 rounded-md"
          onPress={handlePrint}
        >
          <Printer size={20} color="#fff" />
          <Text className="text-white ml-2">PRINT</Text>
        </Button>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </VStack>

      {showModalCancel && (
        <AppModal
          showModal={showModalCancel}
          setShowModal={closeModalCancel}
          heading={"BATALKAN PESANAN"}
          bodyText={
            "Apakah Anda Yakin Ingin Membatalkan Pesanan Ini? Klik Tombol “LANJUTKAN” Untuk Membatalkan Pesanan"
          }
          rejectText="KEMBALI"
          cancelColor="negative"
          confirmText={"LANJUTKAN"}
          onCancel={closeModalCancel}
          onConfirm={() =>
            transactionId !== null && handleCancel(transactionId)
          }
        />
      )}

      {showModal && (
        <AppModal
          showModal={showModal}
          setShowModal={closeModal}
          heading={modalType === StatusOrder.Completed ? "SELESAI" : "KOMPLIN"}
          bodyText={
            modalType === StatusOrder.Completed
              ? "Apakah Anda Yakin Ingin Menyelesaikan Pesanan Ini? Klik Tombol “LANJUTKAN” Untuk Menyelesaikan Pesanan"
              : "Apakah Anda Yakin Ingin Komplin Pesanan Ini? Klik Tombol “LANJUTKAN” Untuk Komplin Pesanan"
          }
          rejectText="KEMBALI"
          cancelColor="negative"
          confirmText={"LANJUTKAN"}
          onCancel={closeModal}
          onConfirm={
            modalType === StatusOrder.Completed
              ? () => transactionId !== null && handleCompleted()
              : () => transactionId !== null && handleComplaint()
          }
        />
      )}
    </ScrollView>
  );
};

export default OnGoingDetailScreen;

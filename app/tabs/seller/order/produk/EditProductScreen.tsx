import { Alert, View } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import UploadMedia from "@/components/shared/UploadFile";
import { useEffect, useState } from "react";
import { Product } from "@/model/product";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import ApiService from "@/service/apiService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLoader from "@/components/shared/Loader";

type EditProductProps = NativeStackScreenProps<
  RootStackParamList,
  "EditProduct"
>;

const EditProductScreen = ({ route }: EditProductProps) => {
  const { productId } = route.params;
  const [products, setProducts] = useState<Product | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStok, setProductStok] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (id: number) => {
    try {
      const response = await ApiService.get(`/produk/${productId}`);
      const data = response.data?.data;

      if (data) {
        setProducts(data);
        setProductName(data.nama_produk); // Assuming 'name' field in response
        setProductPrice(data.harga?.toString()); // Assuming 'price' field in response
        setProductStok(data.stok?.toString()); // Assuming 'stock' field in response
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        nama_produk: productName,
        harga: parseFloat(productPrice), // Ensure number format
        stok: parseInt(productStok, 10), // Ensure integer format
      };

      const token = await AsyncStorage.getItem("token");
      const response = await ApiService.put(
        `/produk/${productId}`,
        payload,
        token ?? ""
      );
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sukses", "Produk berhasil diperbaharui!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("SellerOrder"),
          },
        ]);
      } else {
        console.error("Failed to update product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  return loading ? (
    <MyLoader />
  ) : (
    <VStack space="xl" className="p-5">
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Nama Produk"
          value={productName}
          onChangeText={setProductName}
        />
      </Input>

      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Harga Produk"
          value={productPrice}
          onChangeText={setProductPrice}
        />
      </Input>
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Stok Produk"
          value={productStok}
          onChangeText={setProductStok}
        />
      </Input>

      {/* <UploadMedia
        mediaText="Upload Bukti Promo Untuk Mendapatkan CASHBACK FREE ONGKIR "
        label="Add Bukti Promo"
        onImageSelect={(image) => console.log("Selected Image:", image)}
        placeholder="No image uploaded"
      /> */}

      <Button onPress={handleSubmit} className="bg-cyan-600" size="sm">
        <ButtonText>Simpan</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditProductScreen;

import { View } from "react-native";
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
  const [productImage, setProductImage] = useState<File | null>(null); // For image file
  const { token } = useSelector((state: RootState) => state.auth);

  const fetchProduct = async (id: number) => {
    try {
      const response = await ApiService.get(`/produk/${id}`);
      const data = response.data?.data;

      if (data) {
        setProducts(data);
        setProductName(data.name); // Assuming 'name' field in response
        setProductPrice(data.price?.toString()); // Assuming 'price' field in response
        setProductStok(data.stock?.toString()); // Assuming 'stock' field in response
        setProductImage(data.image); // Assuming 'image' field in response
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleImageUpload = async () => {
    // Logic to upload an image
    const formData = new FormData();
    if (productImage) {
      formData.append("image", productImage);

      try {
        const response = await ApiService.post(
          `/produk/upload-image/${productId}`,
          formData
        );
        return response.data?.data?.imageUrl; // Assuming API returns the uploaded image URL
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await handleImageUpload();

      const payload = {
        nama_produk: productName,
        harga: parseFloat(productPrice), // Ensure number format
        stok: parseInt(productStok, 10), // Ensure integer format
        gambar: imageUrl || productImage, // Use uploaded image URL or existing
      };

      const response = await ApiService.put(
        `/produk/${productId}`,
        payload,
        token ?? ""
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Product updated successfully!");
      } else {
        console.error("Failed to update product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  return (
    <VStack space="xl" className="p-5">
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
      </Input>

      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChangeText={setProductPrice}
        />
      </Input>
      <Input className=" border focus:border-cyan-600">
        <InputField
          className="py-2"
          type="text"
          placeholder="Product Stok"
          value={productStok}
          onChangeText={setProductStok}
        />
      </Input>

      <UploadMedia
        mediaText="Upload Bukti Promo Untuk Mendapatkan CASHBACK FREE ONGKIR "
        label="Add Bukti Promo"
        onImageSelect={(image) => console.log("Selected Image:", image)}
        placeholder="No image uploaded"
      />

      <Button onPress={handleSubmit} className="bg-cyan-600" size="sm">
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default EditProductScreen;

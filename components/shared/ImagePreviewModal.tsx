import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { Download, DownloadIcon, X } from "lucide-react-native";
import { Image } from "../ui/image";

const ImagePreviewModal = ({ imageUrl }: { imageUrl: string }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDownload = async () => {
    const url = imageUrl;
    if (url) {
      try {
        await Linking.openURL(url); // Membuka URL gambar, bisa ditambahkan mekanisme download jika diperlukan
      } catch (error) {
        console.error("Error opening URL:", error);
      }
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUrl }} alt="bukti pembayaran" size="xl" />
      </TouchableOpacity>

      {/* Modal untuk menampilkan gambar full-size */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="absolute top-20 z-50">
            <View className="flex flex-row justify-between items-center w-full px-4">
              <Button action="positive" onPress={handleDownload} size="md">
                <ButtonText className="text-white text-lg">Download</ButtonText>
                <ButtonIcon as={Download} />
              </Button>

              <Button
                action="negative"
                onPress={() => setModalVisible(false)}
                size="md"
              >
                <ButtonText className="text-white text-lg">Close</ButtonText>
                <ButtonIcon as={X} />
              </Button>
            </View>
          </View>

          <Image
            source={{ uri: imageUrl }}
            alt="bukti pembayaran"
            className=" w-full h-full p-10"
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

export default ImagePreviewModal;

import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Button, ButtonGroup, ButtonIcon, ButtonText } from "../ui/button";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "../ui/actionsheet";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Pressable } from "../ui/pressable";
import { UploadCloud, X } from "lucide-react-native";
import { Box } from "../ui/box";
// Gunakan NativeWind untuk styling

interface UploadImageProps {
  mediaText: string;
  label: string;
}
const UploadImage = ({ label, mediaText }: UploadImageProps) => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [image, setImage] = useState<any>(null);

  // Menutup Actionsheet
  const handleClose = () => {
    setShowActionsheet(false);
  };

  // Membuka Actionsheet
  const handleOpen = () => {
    setShowActionsheet(true);
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission needed",
        "You need to grant permission to access the media library"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Menyimpan gambar yang dipilih
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <>
      <Button onPress={handleOpen}>
        <ButtonText>{image ? image.uri.split("/").pop() : label}</ButtonText>
      </Button>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="px-5">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <HStack className="justify-between w-full mt-3">
            <VStack>
              <Heading size="md" className="font-semibold">
                {mediaText}
              </Heading>
              <Text className="text-typography-500 text-sm">
                JPG, PDF, PNG supported
              </Text>
            </VStack>
            <Pressable onPress={handleClose}>
              <X size={24} className="stroke-background-500" />
            </Pressable>
          </HStack>

          <Box className="my-[10px] items-center justify-center rounded-xl bg-background-50 border border-dashed border-outline-300 h-[130px] w-full">
            {image ? (
              <Image
                source={{ uri: image.uri }}
                style={{ width: 62, height: 62 }}
                resizeMode="contain"
              />
            ) : (
              <UploadCloud
                size={62}
                className="h-[62px] w-[62px] stroke-background-200"
              />
            )}
            {!image && (
              <Text className="text-typography-500 mt-2">
                No files uploaded yet
              </Text>
            )}

            {image && (
              <Button
                className="w-full"
                variant="link"
                onPress={handleClearImage}
                action="negative"
              >
                <ButtonText>Clear Image</ButtonText>
              </Button>
            )}
          </Box>

          {/* Button Group untuk aksi */}
          <ButtonGroup className="w-full">
            <Button className="w-full" onPress={handlePickImage}>
              <ButtonText>Browse files</ButtonText>
            </Button>
          </ButtonGroup>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default UploadImage;

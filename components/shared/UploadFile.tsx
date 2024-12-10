import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, ButtonGroup, ButtonText } from "../ui/button";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "../ui/actionsheet";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Pressable } from "../ui/pressable";
import { UploadCloud, X } from "lucide-react-native";
import { Box } from "../ui/box";

interface UploadImageProps {
  mediaText: string;
  label: string;
  onImageSelect: (
    image: ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[] | null
  ) => void;
  placeholder?: string;
  multiple?: boolean;
  style?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  label,
  mediaText,
  onImageSelect,
  placeholder = "No files uploaded yet",
  multiple = false,
  style = "",
}) => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[] | null>(
    null
  );

  const handleClose = () => setShowActionsheet(false);
  const handleOpen = () => setShowActionsheet(true);

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
      allowsMultipleSelection: multiple,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets);
      onImageSelect(multiple ? result.assets[0] : result.assets[0]);
    }
  };

  const handleClearImage = () => {
    setImages(null);
    onImageSelect(null);
  };

  return (
    <>
      <Button onPress={handleOpen} className={style}>
        <ButtonText>
          {images ? images[0]?.uri.split("/").pop() : label}
        </ButtonText>
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
            {images ? (
              <Image
                source={{ uri: images[0].uri }}
                style={{ width: 62, height: 62 }}
                resizeMode="contain"
              />
            ) : (
              <UploadCloud
                size={62}
                className="h-[62px] w-[62px] stroke-background-200"
              />
            )}
            <Text className="text-typography-500 mt-2">
              {images ? images[0].uri.split("/").pop() : placeholder}
            </Text>

            {images && (
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

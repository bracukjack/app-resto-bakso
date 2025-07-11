import React, { useState } from "react";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { Button, ButtonText, ButtonGroup } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { UploadCloud, X } from "lucide-react-native";
import { Image } from "react-native"; // Gunakan Image dari react-native untuk menampilkan gambar
import * as ImagePicker from "expo-image-picker";

export function FileUploadActionsheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [image, setImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="px-5">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <HStack className="justify-between w-full mt-3">
          <VStack>
            <Heading size="md" className="font-semibold">
              Upload your latest resume
            </Heading>
            <Text size="sm">JPG, PNG supported</Text>
          </VStack>
          <Pressable onPress={onClose}>
            <X size={24} className="stroke-background-500" />
          </Pressable>
        </HStack>

        <Box className="my-[18px] items-center justify-center rounded-xl bg-background-50 border border-dashed border-outline-300 h-[130px] w-full">
          {image ? (
            <Image
              source={{ uri: image }}
              className="h-[62px] w-[62px] rounded-lg"
            />
          ) : (
            <UploadCloud
              size={62}
              className="h-[62px] w-[62px] stroke-background-200"
            />
          )}
          <Text size="sm">
            {image ? "Image selected" : "No image uploaded yet"}
          </Text>
        </Box>

        <ButtonGroup className="w-full">
          <Button className="w-full" onPress={handleImagePicker}>
            <ButtonText>Browse files</ButtonText>
          </Button>
          <Button
            className="w-full"
            variant="outline"
            isDisabled={!image}
            action="secondary"
          >
            <ButtonText>Upload</ButtonText>
          </Button>
        </ButtonGroup>
      </ActionsheetContent>
    </Actionsheet>
  );
}

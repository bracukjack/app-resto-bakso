import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react-native";
import { Alert } from "react-native";
import ApiService from "@/service/apiService";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { User } from "@/model/user";
import { kabupatenOptions } from "@/constants/Kabupaten";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";

const EditProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [profile, setProfile] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [kabupaten, setKabupaten] = useState<string>("");
  const [telepon, setTelepon] = useState<string>("");

  const fetchProfile = async () => {
    try {
      const response = await ApiService.get("/profile");
      const data = response.data.data;

      if (data) {
        setProfile(data);
        setName(data.nama || "");
        setEmail(data.email || "");
        setAddress(data.alamat || "");
        setKabupaten(data.kabupaten || "");
        setTelepon(data.telepon || "");
      } else {
        console.log("Profil tidak ditemukan atau respons tidak valid");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil profil:", error);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !address || !kabupaten || !telepon) {
      Alert.alert("Error", "Semua kolom wajib diisi.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await ApiService.put(
        "/update-profile",
        {
          nama: name,
          email: email,
          alamat: address,
          kabupaten: kabupaten,
          telepon: telepon,
        },
        token as string
      );

      if (response.status === 200 || response.status === 201) {
        // Handle success, misalnya redirect ke halaman profile

        Alert.alert("Sukses", "Profil berhasil diperbaharui!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("CustomerAccount"),
          },
        ]);
      } else {
        Alert.alert("Error", "Profil gagal diperbarui!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("CustomerAccount"),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Terjadi kesalahan saat memperbarui profil.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <VStack space="xl" className="p-5">
        <Input className=" border focus:border-cyan-600">
          <InputField
            value={name || ""}
            onChangeText={setName}
            className="py-2"
            type="text"
            placeholder="Nama"
          />
        </Input>

        <Select onValueChange={setKabupaten}>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Pilih Kabupaten" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent>
              {kabupatenOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Input className=" border focus:border-cyan-600">
          <InputField
            value={address || ""}
            onChangeText={setAddress}
            className="py-2"
            type="text"
            placeholder="Alamat"
          />
        </Input>

        <Input className="border focus:border-cyan-600">
          <InputField
            value={email || ""}
            onChangeText={setEmail}
            className="py-2 lowercase"
            type="text"
            placeholder="Email"
          />
        </Input>

        <Input className=" border focus:border-cyan-600">
          <InputField
            value={telepon || ""}
            onChangeText={setTelepon}
            className="py-2"
            type="text"
            placeholder="Nomor Telepon"
          />
        </Input>

        <Button onPress={handleSubmit} className="bg-cyan-600" size="sm">
          <ButtonText>Simpan</ButtonText>
        </Button>
      </VStack>
    </>
  );
};

export default EditProfileScreen;

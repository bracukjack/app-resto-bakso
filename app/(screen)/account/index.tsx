import { SafeAreaView } from "react-native-safe-area-context";
import SellerAccount from "./seller";
import CustomerAccount from "./customer";
import ApiService from "@/service/apiService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { User } from "@/model/user";

const AccountScreen = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await ApiService.get("/profile");
      const data = response.data.data;

      if (data) {
        setProfile(data);
      } else {
        console.log("Profile not found or invalid response");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <SafeAreaView>
      {profile?.role === "penjual" && <SellerAccount />}
      {profile?.role === "pembeli" && <CustomerAccount profile={profile} />}
    </SafeAreaView>
  );
};

export default AccountScreen;

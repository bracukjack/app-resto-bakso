import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SellerAccount from "./seller";
import CustomerAccount from "./customer";

const AccountScreen = () => {
  const [userRole, setUserRole] = useState<"seller" | "customer">("customer");

  const renderAccountComponent = () => {
    if (userRole === "seller") {
      return <SellerAccount />;
    } else if (userRole === "customer") {
      return <CustomerAccount />;
    }
    return null;
  };

  return <SafeAreaView>{renderAccountComponent()}</SafeAreaView>;
};

export default AccountScreen;

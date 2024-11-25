import { SafeAreaView } from "react-native-safe-area-context";
import SellerOrder from "./seller";
import { View } from "react-native";
import CustomerOrder from "./customer";

const OrderScreen = () => {
  return (
    <SafeAreaView>
      {/* <SellerOrder /> */}
      <CustomerOrder />
      <View className="mb-96"></View>
    </SafeAreaView>
  );
};

export default OrderScreen;

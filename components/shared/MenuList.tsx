import { View } from "react-native";
import { Card } from "../ui/card";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { Pressable } from "../ui/pressable";
import { formatRupiah } from "@/utils/formatCurrency";

type MenuListProps = {
  image?: string;
  title?: string;
  price?: number;
  id?: number;
  stok?: number;
  onPress?: () => void;
};

const MenuList: React.FC<MenuListProps> = ({
  image,
  title,
  price,
  onPress,
  id,
  stok,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Card className="flex flex-col gap-2 bg-transparent p-1">
          <Image
            className="rounded-lg shadow-md"
            size="lg"
            source={{ uri: image }}
            alt="menu image"
          />
          <View>
            <Text className="font-bold text-sm text-black uppercase leading-5">
              {title}
            </Text>
            <Text className="text-sm text-blac font-semibold">
              {price ? formatRupiah(price) : ""}
            </Text>
          </View>
        </Card>
      </View>
    </Pressable>
  );
};

export default MenuList;

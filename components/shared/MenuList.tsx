import { View } from "react-native";
import { Card } from "../ui/card";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

type MenuListProps = {
  image?: string;
  title?: string;
  price?: string;
};

const MenuList: React.FC<MenuListProps> = ({ image, title, price }) => {
  return (
    <View>
      <Card className="flex flex-col gap-2 bg-transparent p-1">
        <Image
          className="rounded-lg shadow-md"
          size="lg"
          source={image}
          alt="menu image"
        />
        <View>
          <Text className="font-bold text-sm text-black uppercase leading-5">
            {title}
          </Text>
          <Text className="text-sm text-blac font-semibold">{price}</Text>
        </View>
      </Card>
    </View>
  );
};

export default MenuList;

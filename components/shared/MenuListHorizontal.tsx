import { View } from "react-native";
import { Card } from "../ui/card";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { Button, ButtonIcon } from "../ui/button";
import { Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import { formatRupiah } from "@/utils/formatCurrency";

type MenuListHProps = {
  image?: string;
  title?: string;
  price?: number;
  id: number;
  stok?: number;
  onQtyChange: (id: number, qty: number) => void;
};

const MenuListH: React.FC<MenuListHProps> = ({
  image,
  title,
  price,
  id,
  stok,
  onQtyChange,
}) => {
  const [qty, setQty] = useState<number>(0);

  const increment = () => {
    if (stok !== undefined && qty < stok) {
      const newQty = qty + 1;
      setQty(newQty);
      onQtyChange(id, newQty);
    }
  };

  const decrement = () => {
    if (qty > 0) {
      const newQty = qty - 1;
      setQty(newQty);
      onQtyChange(id, newQty);
    }
  };

  const total = price ? price * qty : 0;
  return (
    <View>
      <Card
        className={
          stok === 0
            ? `disable opacity-60 flex flex-row gap-5 w-full justify-between bg-transparent p-1 pb-3 items-center  border-b border-gray-300`
            : `flex flex-row gap-5 w-full justify-between bg-transparent p-1 pb-3 items-center  border-b border-gray-300`
        }
      >
        <View className="flex flex-row gap-3 justify-start items-center">
          <Image
            className="rounded-lg shadow-md"
            size="lg"
            source={{ uri: image }}
            alt="menu image"
          />
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg text-black uppercase leading-5">
              {title}
            </Text>
            <Text className="text-sm text-black font-semibold">
              {price ? formatRupiah(price) : ""}
            </Text>

            {stok === 0 ? (
              <Text className="text-red-500 font-semibold">Stok Kosong</Text>
            ) : (
              <Text className="font-bold text-sm text-black mt-2">
                Total: {total ? `${formatRupiah(total)}` : "Rp 0"}
              </Text>
            )}

            {qty >= (stok ?? 0) && (
              <Text className="text-red-500 font-semibold text-sm">
                Stok hanya tersisa {stok}
              </Text>
            )}
          </View>
        </View>

        {stok !== 0 ? (
          <View className="flex flex-row gap-3 justify-center items-center">
            <Button
              size="xs"
              variant="outline"
              action="negative"
              className="rounded-full p-2"
              onPress={decrement}
            >
              <ButtonIcon as={Minus} />
            </Button>

            <Text className="text-black font-semibold text-lg">{qty}</Text>

            <Button
              size="xs"
              variant="outline"
              action="positive"
              className={`rounded-full p-2 ${
                qty >= (stok ?? 0) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onPress={increment}
              disabled={qty >= (stok ?? 0)}
            >
              <ButtonIcon as={Plus} />
            </Button>
          </View>
        ) : (
          ""
        )}
      </Card>

      {}
    </View>
  );
};

export default MenuListH;
